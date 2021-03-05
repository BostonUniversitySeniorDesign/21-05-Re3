import os
from flask import Flask, request
from flask_cors import CORS
from subprocess import PIPE, Popen, STDOUT
from flask_socketio import SocketIO, emit, disconnect
from google.cloud.devtools import cloudbuild_v1
import time

app = Flask(__name__)
cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", allow_upgrades=False)

def border_msg(msg):
    count = len(msg) + 2 # dash will need +2 too
    dash = "-"*count 
    return "+{dash}+\n| {msg} |\n+{dash}+".format(dash=dash,msg=msg)

def build_and_run(version, project_ref):
    print('running')
    print(f'R_VER={version} project_ref={project_ref}')
    ref_base = os.path.basename(project_ref)

    try:
        emit('stdout', {'log': border_msg("BUILDING IMAGE...")})
        p3 = Popen(['gcloud', 'builds', 'submit', '--config=cloudbuild.yaml', f'--substitutions=_R_VERSION={version},_PROJECT_REF={ref_base}', '.', '--async'],
            shell=False) 
        res = ""
        stdout, stderr = p3.communicate()
        # if subprocess is not successful, it returns the error:
        if p3.returncode != 0:
            res = stderr.splitlines()[-5:-1]
            res = b' '.join(res)
            res_str = res.decode("utf-8") if type(res) is bytes else res
            import re
            ret = re.findall(r'(?:Error).*', res_str)
            print('problem:', ret)
            return ret
        else:
            # else returns success
            emit('stdout', {'log': border_msg("SUCCESSFULLY BUILT DOCKER IMAGE")})
    except Exception as e:
        print(e)
        return e
    
    try:
        emit('stdout', {'log': border_msg("ATTEMPTING TO RUN CODE...")})
        p3 = Popen(['gcloud', 'run', 'deploy', 're3', '--image', f'us-east1-docker.pkg.dev/re3-docker/re3-docker-repo/re3-image:{ref_base}', '--max-instances', '1', '--cpu', '1', '--region=us-east1', '--platform=managed', '--async'],
            shell=False, stdout=STDOUT, stderr=STDOUT)
        res = ""
        stdout, stderr = p3.communicate()
        # if subprocess is not successful, it returns the error:
        if p3.returncode != 0:
            res = stderr.splitlines()[-5:-1]
            res = b' '.join(res)
            res_str = res.decode("utf-8") if type(res) is bytes else res
            import re
            ret =re.findall(r'(?:Error).*', res_str)
        else:
            # else returns success
            emit('stdout', {'log': border_msg("SUCCESSFULLY RAN CODE")})
            return
    # or time limit exceeded
    except Exception as e:
        # print(e)
        return e
    return 'success'

def ack(version, project_ref):
    print('Message was received')
    print('version and projectref from client:', version, project_ref)
    build_and_run(version, project_ref)

@app.route('/', methods=['GET'])
def say_hello():
    return "Hello, world!"

@socketio.on('connect')
def connect():
    version = request.args.get('version')
    project_ref = request.args.get('projectRef')
    print("version in connection:", version)
    print("project ref:", project_ref)
    emit('ack', {'data': 'Connected'}, callback=ack)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)
