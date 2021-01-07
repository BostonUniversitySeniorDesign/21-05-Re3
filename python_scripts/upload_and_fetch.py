import pyrebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
import json
config = {
  "apiKey": "",
  "authDomain": "",
  "databaseURL": "",
  "projectId": "",
  "storageBucket": "",
  "messagingSenderId": "",
  "appId": "1"
  "measurementId": ""
}

# initialize firestore
cred = credentials.Certificate("re3-fb-firebase-adminsdk-qqjc3-58ff1a3d2d.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# initialize storage
firebase = pyrebase.initialize_app(config)
storage = firebase.storage()


def updateFireStore(folder, filename):
    """
    folder: (String) folder name
    filename: (String) file name
    """
    doc_ref = db.collection(u'DOIs').document(folder)
    doc_ref.set({
        u'DOI': folder
    }, merge = True)
    # Atomically add a new region to the 'allfiles' array field.
    doc_ref.update({u'allfiles': firestore.ArrayUnion([filename])})
    return folder + "/" + filename
    
    
def updateFireStoreRFiles(folder, filename):
  """
  folder: (String) folder name
  filename: (String) file name
  """
  doc_ref = db.collection(u'DOIs').document(folder)
  doc_ref.set({
      u'DOI': folder
  }, merge = True)
  # Atomically add a new region to the 'rfiles' array field.
  doc_ref.update({u'Rfiles': firestore.ArrayUnion([filename])})
  return folder + "/" + filename

def push_doi_packages(projects_root_directory):
  """  
  projects_root_directory: (String) represents where the projects are located in your local machine
  """
  # get whatever projects projects_root_directory have under the 
  arr_cloud = os.listdir(projects_root_directory)
  # there needs to be an error check for this statement
  # arr_cloud.remove('.DS_Store') 
  # uncomment the line above if a DS_Store file is created in your folder
  # iterate through all the projects in that directory
  for path_on_cloud in arr_cloud:
      #print(path_on_cloud)
      #get the files under that the project directory
      arr_local = os.listdir(projects_root_directory + "/" + path_on_cloud)
      for local_file in arr_local:
          # get the path where the fild is stored
          path_local = projects_root_directory + "/" + path_on_cloud + "/" +  local_file
          # put the file specified by local_path into the location specified by path_cloud + "/" + local_file
          storage.child(path_on_cloud + "/" + local_file).put(path_local);
          print(updateFireStore(path_on_cloud, local_file))
          extension = os.path.splitext(local_file)[1]
          if(extension == ".R"):
              print(updateFireStoreRFiles(path_on_cloud,local_file))
      print('\n')

#call function to push all research projects to DB with the path where the Research project are
# push_doi_packages(</Users/yourusername/location/research_files_folder>)

def pull_ratings_for_snippets():
  """
  pull ratings that were given to snippets by users and put them in json object
  """
  #get the reference for the collection of ratings
  
  ref = db.collection(u'ratings')
  docs = ref.stream()
  data = {}
  #loop through all the snippets and their ratings
  for doc in docs:
    print("helloOKKKKKK")
    #get userid and snippet
    dictionary = doc.to_dict()
    snippet = doc.id
    dict_list = list(dictionary.keys())
    for user_id, user_rating in dictionary.items():
      data[snippet] = {}
      print(type(user_rating))
      print(user_rating)
      print(user_id)
      #get onboarding info from uid
      data_uid = db.collection(u'users').document(user_id).get()
      data_uid_dict = data_uid.to_dict()
      exp = 0
      try:
        exp = data_uid_dict["experience"]
      except (KeyError,TypeError):
        print("User did not make onboarding process")

      data[snippet][user_id] = {"rating": user_rating, 'experience': exp}

  with open('data_readability_model.txt','w') as outputfile:
    json.dump(data,outputfile)


# call functions to pull snippets and store them into json file
pull_ratings_for_snippets()



