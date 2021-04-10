import os
from flask import Flask, request
from flask_cors import CORS
from subprocess import PIPE, Popen, STDOUT
from flask_socketio import SocketIO, emit, disconnect
from google.cloud.devtools import cloudbuild_v1
import time
from celery import Celery
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pyrebase


config = {
  "apiKey": "AIzaSyDm7t3kFLtOriXhZyOOJReon1qnuubUbvE",
  "authDomain": "re3-fb.firebaseapp.com",
  "databaseURL": "https://re3-fb.firebaseio.com",
  "projectId": "re3-fb",
  "storageBucket": "re3-fb.appspot.com",
  "messagingSenderId": "121193880841",
  "appId": "1:121193880841:web:4efade68aa5339e1f487d8",
  "measurementId": "G-4PKZCP0PP0",

}


firebase = pyrebase.initialize_app(config)


cred = credentials.Certificate("fb_service.json")
firebase_admin.initialize_app(cred)


db = firestore.client()
storage = firebase.storage()


app = Flask(__name__)
cors = CORS(app, allow_headers='*', origins='*')


app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',
    CELERY_RESULT_BACKEND='redis://localhost:6379'
)
celery = Celery(app.name, broker=app.config["CELERY_BROKER_URL"])
celery.conf.update(app.config)


@app.route('/', methods=['GET'])
def say_hello():
    return "Hello, world!"


@app.route('/run', methods=['POST'])
def run_process():
    data = request.json
    dependencies = data['dependencies']
    version = data['version']
    project_ref = data['projectRef']

    ref_base = os.path.basename(project_ref)
    try:
        build_and_report.delay(dependencies, version, project_ref)
    except Exception as e:
        print(e)
        return 'error'

    return 'running', 200


@celery.task
def build_and_report(dependencies, version, project_ref):
    ref_base = os.path.basename(project_ref)

    doc_ref = db.document(project_ref)

    print('starting build')
    build_process = Popen(['gcloud', 'builds', 'submit', '--config=cloudbuild.yaml', '--timeout=30m', '--ignore-file=.dockerignore', f'--substitutions=_DEPENDENCIES={dependencies},_R_VERSION={version},_PROJECT_REF={ref_base}', '.'],
                          shell=False, stdout=PIPE, stderr=PIPE)
    stdout, stderr = build_process.communicate(timeout=1800)
    build_status = ''

    filename = f'build_{ref_base}.txt'
    storage_path = f'build_logs/{filename}'

    if build_process.returncode != 0:
        print(str(stderr))
        with open(filename, 'w') as f:
            logs = str(stderr).replace('\\n', '\n').replace('\\r', '\n').split('\n')
            for log in logs:
                f.write(log + '\n')
        storage.child(storage_path).put(filename)
        token = cred.get_access_token()[0]
        logs_url = storage.child(storage_path).get_url(token)
        build_status = 'error'
        doc_ref.update({'status': 'build error', 'buildLogs': logs_url})
        os.remove(filename)
        return build_status
    else:
        with open(filename, 'w') as f:
            logs = str(stdout).replace('\\n', '\n').replace('\\r', '\n').split('\n')
            for log in logs:
                f.write(log + '\n')
        storage.child(storage_path).put(filename)
        token = cred.get_access_token()[0]
        logs_url = storage.child(storage_path).get_url(token)
        doc_ref.update({'status': 'build success', 'buildLogs': logs_url})
        build_status = 'success'
        os.remove(filename)

    print('starting run')
    run_process = Popen(['gcloud', 'run', 'deploy', f're3-{ref_base.lower()}', '--image', f'us-east1-docker.pkg.dev/re3deploy/re3-images/re3-image:{ref_base}', '--max-instances', '1', '--cpu', '1', '--region=us-east1', '--platform=managed', '--allow-unauthenticated'],
                        shell=False, stdout=PIPE, stderr=PIPE)
    stdout, stderr = run_process.communicate(timeout=1800)

    filename = f'run_{ref_base}.txt'
    log_process = Popen(['gcloud', 'logging', 'read', f'resource.type=cloud_run_revision AND resource.labels.service_name=re3-{ref_base.lower()}', '--project', 're3deploy', '--format', 'value(textPayload)'], shell=False, stdout=PIPE, stderr=PIPE)
    with open(filename, 'w') as f:
        save_process = Popen(['awk', '{a[i++]=$0} END {for (j=i-1; j>=0;) print a[j--] }'], shell=False, stdin=log_process.stdout, stdout=f)

    stdout, stderr = log_process.communicate(timeout=1800)

    print('got logs', str(stdout), str(stderr))

    storage_path = f'run_logs/{filename}'
    storage.child(storage_path).put(filename)
    token = cred.get_access_token()[0]
    logs_url = storage.child(storage_path).get_url(token)


    doc_ref.update({'status': 'finished', 'runLogs': logs_url})

    os.remove(filename)

    print('done')
    return 'done'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
