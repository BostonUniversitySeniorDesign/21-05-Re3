import pyrebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os

# Fill in from firebase
config = {
    "apiKey": "",
    "authDomain": "",
    "databaseURL": "",
    "projectId": "",
    "storageBucket": "",
    "messagingSenderId": "",
    "appId": "",
    "measurementId": ""
}

# initialize firestore, include json file in directory
cred = credentials.Certificate("re3-credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# initialize storage
firebase = pyrebase.initialize_app(config)
storage = firebase.storage()

# create references to storage snippets in firestore
def updateFireStore(folder, filename):
    doc_ref = db.collection(folder).document(filename)
    doc_ref.set({
        u'ref': folder + "/" + filename
    }, merge = True)

## reaplce this with wherever you are storing your snippets
dir_path = "/Users/ethanhung/Desktop/re-3/snippets"
dir_name = dir_path.split("/")[-1]
print(dir_name, '\n');
arr_files = os.listdir(dir_path)

for file in arr_files:
    path_local = dir_path + "/" + file
    print(path_local)
    print(dir_name + "/" + file)
    storage.child(dir_name + "/" + file).put(path_local)
    #updateFireStore(dir_name, os.path.splitext(file)[0])
    print('\n')