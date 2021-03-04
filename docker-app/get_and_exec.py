import sys
import pyrebase
import google.oauth2.credentials
from google.cloud import firestore
from file_util import get_filenames, fetch_files

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

    user_id = sys.argv[1]
    project_ref = sys.argv[2]
    print("Pulling project from user ID:", user_id)
    print("Project reference:", project_ref)

    db_client = firestore.Client(project=config["projectId"],
                                 credentials=credentials)

    files = get_filenames(db_client, user_id)
    fetch_files(storage_client, user_id, files, project_dir)

    auth_client.delete_user_account(token)


if __name__ == "__main__":
    main()