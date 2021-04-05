import firebase_admin
from firebase_admin import credentials,firestore
import os
import json
import numpy as np  
import pandas as pd
from numpy import savetxt
from scipy import stats
from collections import OrderedDict 

# initialize firestore
cred = credentials.Certificate("../re3-fb-firebase-adminsdk-qqjc3-71e6a4ae0c.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def pull_attr_from_users():
    """
    pull ratings that were given to snippets by users and put them in json object
    """
    #get the reference for the collection of ratings  
    ref = db.collection(u'users')
    docs = ref.stream()

    # this will serve to store the user info
    data = {}

    # this just counts how many ratings were given to each snippet
    count = np.zeros(100)

    #user count
    user_counter = 0

    #loop through all the snippets and their ratings
    for doc in docs:
        #get user document
        dictionary = doc.to_dict()

        # store the email of the current user
        # email = dictionary["email"]    
        temp = {}

        data["user" + str(user_counter)] = temp
        try:
            # get the gender
            gender = dictionary["gender"]

            # get the course level
            courses = dictionary["courses"]

            # get the background
            background = dictionary["background"]

            # get experience with R
            exp_R = dictionary["familiarWithR"]

            # get the experience
            exp = dictionary["experience"]

            temp["gender"] = gender
            temp["courses"] = courses
            temp["education background"] = background
            temp["experience with R"] = exp_R
            temp["experience with code"] = exp

            user_counter+=1

        except KeyError:
            print("user: " + str(dictionary["email"]) + " did not onboard" )

    df = pd.DataFrame.from_dict(data)
    df.to_csv('../../data/user_attr.csv')



pull_attr_from_users()



