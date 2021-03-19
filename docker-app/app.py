#import eventlet
#eventlet.monkey_patch()


import os
from flask import Flask, request
from flask_cors import CORS
from subprocess import PIPE, Popen, STDOUT
from flask_socketio import SocketIO, emit, disconnect
from google.cloud.devtools import cloudbuild_v1
import time
from celery import Celery



app = Flask(__name__)
cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", message_queue='redis://localhost:6379', async_mode='threading', async_handlers=True, engineio_logger=True)


app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',
    CELERY_RESULT_BACKEND='redis://localhost:6379'
)
celery = Celery(app.name, broker=app.config["CELERY_BROKER_URL"])
celery.conf.update(app.config)


def border_msg(msg):
    count = len(msg) + 2 # dash will need +2 too
    dash = "-"*count 
    return "+{dash}+\n| {msg} |\n+{dash}+".format(dash=dash,msg=msg)

def build_and_run(session_id, version, project_ref):
    print('running')
    print(f'R_VER={version} project_ref={project_ref}')
    ref_base = os.path.basename(project_ref)

    try:
        build_and_report.delay(session_id, version, ref_base)
    except Exception as e:
        print(e)
        return e
    
    # try:
    #     emit('stdout', {'log': border_msg("ATTEMPTING TO RUN CODE...")})
    #     p3 = Popen(['gcloud', 'run', 'deploy', 're3', '--image', f'us-east1-docker.pkg.dev/re3-docker/re3-docker-repo/re3-image:{ref_base}', '--max-instances', '1', '--cpu', '1', '--region=us-east1', '--platform=managed', '--async'],
    #         shell=False, stdout=STDOUT, stderr=STDOUT)
    #     res = ""
    #     stdout, stderr = p3.communicate()
    #     # if subprocess is not successful, it returns the error:
    #     if p3.returncode != 0:
    #         res = stderr.splitlines()[-5:-1]
    #         res = b' '.join(res)
    #         res_str = res.decode("utf-8") if type(res) is bytes else res
    #         import re
    #         ret =re.findall(r'(?:Error).*', res_str)
    #     else:
    #         # else returns success
    #         emit('stdout', {'log': border_msg("SUCCESSFULLY RAN CODE")})
    #         return
    # # or time limit exceeded
    # except Exception as e:
    #     # print(e)
    #     return e
    print('done')
    return 'success'

def ack(session_id, version, project_ref):
    print('Message was received')
    print('version and projectref from client:', version, project_ref)
    build_and_run(session_id, version, project_ref)

@app.route('/', methods=['GET'])
def say_hello():
    return "Hello, world!"

@socketio.on('connect')
def connect():
    version = request.args.get('version')
    project_ref = request.args.get('projectRef')
    session_id = request.sid
    print('connected on server')
    print("version in connection:", version)
    print("project ref:", project_ref)
    print("session id:", session_id)
    emit('ack', {'message': 'Connected', 'sessionID': session_id}, callback=ack)

@socketio.on('test')
def test_state():
    print('im still listening')

@celery.task
def build_and_report(session_id, version, project_ref):
    task_socketio = SocketIO(message_queue='redis://localhost:6379', async_mode='threading', async_handlers=True, engineio_logger=True)
    p3 = Popen(['gcloud', 'builds', 'submit', '--config=cloudbuild.yaml', f'--substitutions=_R_VERSION={version},_PROJECT_REF={project_ref}', '.'],
            shell=False, stdout=PIPE, stderr=PIPE)
    try:
        timeout = time.time() + 60*30   # 30 minutes from now
        while time.time() < timeout:
            task_socketio.sleep(0)
            output = p3.stdout.readline()
            if p3.poll() is not None:
                break
            if output:
                task_socketio.emit('stdout', {'log': output.strip().decode()}, room=session_id)
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
            task_socketio.emit('stdout', {'log': border_msg("SUCCESSFULLY BUILT DOCKER IMAGE")}, room=session_id)
    except Exception as e:
        print(e)
    print("done") 



if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, use_reloader=False)
