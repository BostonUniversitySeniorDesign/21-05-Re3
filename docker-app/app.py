from flask import Flask, request
from flask_cors import CORS
from subprocess import PIPE, Popen
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

def build_and_run(version, user_id, project_doc):
    print('running')
    print(f'R_VER={version} user_id={user_id} project_ref={project_doc}')
    p3 = Popen(['docker', 'build', '--build-arg', f'R_VER={version}', '--build-arg', f'USER_ID={user_id}', '--build-arg', f'PROJECT_REF={project_doc}', '-t', 're3-image', '.'], \
        shell=False, stdout=PIPE, stderr=PIPE) 
    res = ""
    try:
        emit('stdout', {'log': border_msg("BUILDING IMAGE...")})
        timeout = time.time() + 60*30   # 30 minutes from now
        while time.time() < timeout:
            output = p3.stdout.readline()
            if p3.poll() is not None:
                break
            if output:
                emit('stdout', {'log': output.strip().decode()})
        if time.time() >= timeout:
            p3.kill()
            ret = 'time limit on docker build exceeded'
            return ret
        # time limit for execution is one hour 
        stdout, stderr = p3.communicate()
        # if subprocess is not successful, it returns the error:
        if p3.returncode != 0:
            res = stderr.splitlines()[-5:-1]
            res = b' '.join(res)
            res_str = res.decode("utf-8") if type(res) is bytes else res
            import re
            ret = re.findall(r'(?:Error).*', res_str)
            return ret
        else:
            # else returns success
            emit('stdout', {'log': border_msg("SUCCESSFULLY BUILT DOCKER IMAGE")})
    except Exception as e:
        print(e)
        ret = "error: " + e
        return ret

    p3 = Popen(['docker', 'run', '-ti', '--rm', 're3-image'], \
        shell=False, stdout=PIPE, stderr=PIPE)
    res = ""
    try:
        emit('stdout', {'log': border_msg("ATTEMPTING TO RUN CODE...")})
        timeout = time.time() + 60*30   # 30 minutes from now
        while time.time() < timeout:
            output = p3.stdout.readline()
            if p3.poll() is not None:
                break
            if output:
                emit('stdout', {'log': output.strip().decode()})
        if time.time() >= timeout:
            p3.kill()
            ret = 'time limit on docker build exceeded'
            return ret
        # time limit for execution is one hour 
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
        ret = "error: " + e
        return ret
    return 'success'

def ack(version, user_id, project_doc):
    print('Message was received')
    print('version and uid from client:', version, user_id, project_doc)
    build_and_run(version, user_id, project_doc)

@app.route('/', methods=['GET'])
def say_hello():
    return "Hello, world!"

@socketio.on('connect')
def connect():
    version = request.args.get('Version')
    print("version in connection:")
    print(version)
    emit('ack', {'data': 'Connected'}, callback=ack)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)
