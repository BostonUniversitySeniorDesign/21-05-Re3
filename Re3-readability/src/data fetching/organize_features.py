import numpy as np
import pandas as pd
import json


def org(num_features, filename, filename_out):
    # putting the data from metrics.txt onto a list
    source_file = '../get_readability_stats/readability-snippets-r/' + filename
    with open(source_file,'r') as source:
        json_source = source.read()
        data_encoded = json.loads('[{}]'.format(json_source))

    # storing the list in a matrix where the first row corresponds to the attributes of snippet 1 and so on
    matrix = np.ndarray((100,num_features),dtype = object)
    for i in data_encoded[0]:
        val = list(i.values())
        if(len(val[0]) == 11):
            counter = int(val[0][7:9])
        elif(len(val[0]) == 10):
            counter = int(val[0][7])
        else:
            counter = 100
        for j in range(1,len(val)):
            matrix[counter-1][j] = val[j]

    # append snippet names onto the matrix
    snippet_names = np.ndarray((1,100),dtype = object)
    for i in range(1,101):
        snippet_names[0,i-1] = 'snippet' + str(i)

    matrix[:,0] = snippet_names

    # creating data frame of the raw data in metrics.txt
    df = pd.DataFrame(matrix,columns= data_encoded[0][0].keys())

    print(df)

    # saving data frame onto features.csv
    df.to_csv('../../data/' + filename_out  + '.csv')

# 21 with 
org(26,'metrics_with_vars.txt','features_with_vars')
