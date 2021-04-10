import sys
import os
import ssl
import pyrebase
import google.oauth2.credentials
from google.cloud import firestore
from file_util import get_filenames, fetch_files, find_files
from execute_files import execute_files


ssl._create_default_https_context = ssl._create_unverified_context


config = {
  "apiKey": "AIzaSyDm7t3kFLtOriXhZyOOJReon1qnuubUbvE",
  "authDomain": "re3-fb.firebaseapp.com",
  "databaseURL": "https://re3-fb.firebaseio.com",
  "projectId": "re3-fb",
  "storageBucket": "re3-fb.appspot.com",
  "messagingSenderId": "121193880841",
  "appId": "1:121193880841:web:4efade68aa5339e1f487d8",
  "measurementId": "G-4PKZCP0PP0"
}


firebase = pyrebase.initialize_app(config)
auth_client = firebase.auth()
storage_client = firebase.storage()


project_dir = "/usr/workdir/project"


def main():
    user = auth_client.sign_in_anonymous()
    token = user['idToken']
    credentials = google.oauth2.credentials.Credentials(token)

    project_ref = sys.argv[1]
    print("Project reference:", project_ref)

    db_client = firestore.Client(project=config["projectId"],
                                 credentials=credentials)

    files = get_filenames(db_client, project_ref)
    fetch_files(files, project_dir)

    auth_client.delete_user_account(token)

    files_to_exec = find_files(project_dir)

    for f in files_to_exec:
        res = execute_files(f)
        filename = os.path.basename(f)
        print(f'FILENAME: {filename.strip()}\nRESULT: {res}')


if __name__ == "__main__":
    main()