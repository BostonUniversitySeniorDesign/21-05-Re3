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

def pull_ratings_for_snippets():
  """
  pull ratings that were given to snippets by users and put them in json object
  """
  #get the reference for the collection of ratings  
  ref = db.collection(u'users')
  docs = ref.stream()

  # this will serve to count the total sum of all ratings given to a snippet number
  data = {}

  for i in range(1,101):
    data["snippet" + str(i)] = 0

  # this just counts how many ratings were given to each snippet
  count = np.zeros(100)

  # completed in full counter 
  count_complete = 0

  # amount of ratings
  total_ratings = 0

  # used to create the df of all the ratings
  col_df_list = list()

  col_df_list.append('filename')

  # used to store the matrix of all ratings
  init  = 0

  #user count
  user_counter = 0

  #loop through all the snippets and their ratings
  for doc in docs:
    #get user document
    dictionary = doc.to_dict()
    
    # if the user has completed all the ratings then increment the counter
    currSnippet  = dictionary["currentSnippet"]
    if(int(currSnippet) == 101):
      count_complete += 1
    
    #temp array to store the user ratings if he has made any 
    temp_array = np.zeros((1,100))

    try:
      # get the ratings field
      ratings = dictionary["ratings"]

      # parse through all the snippets the user rated in the ratings field
      for snippet,rating in ratings.items():
        
        # the 13 lines below store the rating in the correct place
        if(int(rating) > 0):
          total_ratings += 1
          if(len(snippet) == 8):
            snippet_num = int(snippet[7])
            count[snippet_num - 1] += 1

          elif(len(snippet) == 9):
            snippet_num = int(snippet[7:9])
            count[snippet_num - 1] += 1

          else:
            # the max length is 12 and that happens when the snippet num is 100
            snippet_num = 100
            count[snippet_num -1 ] += 1

          temp_array[0][snippet_num-1] = int(rating)
          data[snippet] += int(rating)
      
      # if the matrix of ratings has been initialized then simply append the temp
      # ratings else have the matrix be the temp array and increment init to denote 
      # the matrix has been initalized
      if(init == 0):
        init += 1
        matrix = temp_array
      else:
        matrix = np.append(matrix,temp_array,0)
      
      # if all was done correctly then you can store the user in the data frame of all ratings 
      # so append his email to the list so that it becomes one of the columns of the data frame
      col_df_list.append("user" + str(user_counter))
      user_counter+=1

    except KeyError:
      print("user did not rate anything yet")

  # make the data dictionary represent the average rating for each snippet
  # NOTE: this cannot be run if the count[i-1] is 0 but since every snippet
  # has been rated at least once then we can execute this
  for i in range(1,101):
    data["snippet" + str(i)] /= count[i-1]

  # save the average rating of each snippet as a df in average_ratings.csv
  df = pd.DataFrame(list(data.items()),columns=['filename','snippet rating'])
  df.to_csv('../../data/average_ratings.csv')

  matrix_2 = matrix.copy()
  
  for i in range(matrix_2.shape[0]):
    for j in range(matrix_2.shape[1]):
      if(matrix_2[i][j] == 0):
        matrix_2[i][j] = np.nan


  distribution_matrix = np.zeros((100,10))


  
  for i in range(matrix.shape[1]):
    for j in range(matrix.shape[0]):
      if(matrix[j,i]>0):
        distribution_matrix[i,int(matrix[j,i]) - 1] += 1
  
  norm_factor = (np.sum(distribution_matrix, axis = 1))
  norm_factor = np.reshape(norm_factor, (100,1))

  distribution_matrix = np.true_divide(distribution_matrix,norm_factor)
  
  
  # creating array that will store mode ratings
  mode_ratings = stats.mode(matrix_2,nan_policy='omit')[0]

  # the lines below make the df that stores all the ratings
  snippet_names = list()
  for i in range(1,101):
    snippet_names.append('snippet' + str(i))
  
  snippet_matrix = np.array([snippet_names])

  #formatting matrix df
  matrix = np.append(snippet_matrix,matrix,0)
  matrix = matrix.transpose()

  #formatting mode ratings df
  mode_ratings = np.append(snippet_matrix,mode_ratings,0)
  mode_ratings = np.transpose(mode_ratings)

  #formatting distribution ratings
  snippet_matrix = np.transpose(snippet_matrix)
  print(snippet_matrix.shape)
  print(distribution_matrix.shape)

  distribution_matrix = np.append(snippet_matrix,distribution_matrix,1)

  df = pd.DataFrame(matrix,columns = col_df_list)
  df.to_csv('../../data/matrix_of_ratings.csv')

  df = pd.DataFrame(mode_ratings,columns = ['filename','snippet rating'])
  df.to_csv('../../data/mode_ratings.csv')

  col_df_list = ['filename', 'p(y = 1)','p(y = 2)','p(y = 3)','p(y = 4)','p(y = 5)','p(y = 6)','p(y = 7)','p(y = 8)','p(y = 9)','p(y = 10)']
  df = pd.DataFrame(distribution_matrix,columns = col_df_list)
  df.to_csv('../../data/distribution_ratings.csv')

  print("this is the amount of users that completed the survey :"  + str(count_complete))
  print("this is the total number of ratings collected: " + str(total_ratings))

pull_ratings_for_snippets()



