import os
from flask import Flask, jsonify, make_response, redirect, request, url_for
from flask_cors import CORS
import pickle 
import os
import sys
import requests
import numpy as np
import get_features
import json

# create and configure the app
app = Flask(__name__, instance_relative_config=True)
# app.config.from_mapping(
#     SECRET_KEY='dev',
#     DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
# )
test_config = None
if test_config is None:
    # load the instance config, if it exists, when not testing
    app.config.from_pyfile('config.py', silent=True)
else:
    # load the test config if passed in
    app.config.from_mapping(test_config)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

CORS(app)

@app.route('/',methods = ['POST'])
def base():
    data = request.data
    data = data.decode('utf-8')
    all_vars = get_features.get_vars(data)
    dic_features = get_features.get_readability_metrics(all_code = data, vars = all_vars)


    print(dic_features)
    features = np.array(list(dic_features.values()))
    # reshaping it so it is 2D
    features = features.reshape(1,-1)
    model = pickle.load(open('linear_model.sav', 'rb'))

    # load individual models and carry out their predictions
    model_line_len = pickle.load(open('linear_model_avg_line_len.sav','rb'))
    model_parantheses = pickle.load(open('linear_model_avg_parentheses.sav','rb'))
    model_periods = pickle.load(open('linear_model_avg_periods.sav','rb'))
    model_assignments = pickle.load(open('linear_model_avg_assignments.sav','rb'))

    line_len_score = model_line_len.predict(np.array([[dic_features['avg_line_len']]]))
    parentheses_score = model_parantheses.predict(np.array([[dic_features['avg_parentheses']]]))
    periods_score = model_periods.predict(np.array([[dic_features['avg_periods']]]))
    assignments_score  = model_assignments.predict(np.array([[dic_features['avg_assignments']]]))

    # determine what feature the user could improve on by some threshold that we determined from
    # some logic and compose the suggestion string the backend will send

    #TODO: change this threshold to something logical
    threshold = 6
    suggestion = ''
    if(line_len_score < threshold and (parentheses_score < threshold or periods_score < threshold
     or assignments_score < threshold or dic_features["avg_comments"] == 0)):
        suggestion += 'breaking up your lines,'
    elif(line_len_score < threshold):
        suggestion += 'breaking up your lines'

    if(parentheses_score < threshold and (periods_score < threshold
     or assignments_score < threshold or dic_features["avg_comments"] == 0)):
        suggestion += 'removing any irrelevant parentheses in your lines,'
    elif(parentheses_score < threshold):
        suggestion += 'removing any irrelevant parentheses in your lines'
    
    if(periods_score < threshold and (assignments_score < threshold or dic_features["avg_comments"] == 0)):
        suggestion += 'diminishing the periods in your lines,'
    elif(periods_score < threshold):
        suggestion += 'diminishing the periods in your lines'

    if(dic_features["avg_comments"] == 0 and assignments_score < threshold):
        suggestion += 'adding more comments to make it more documented and reusable,'

    elif(dic_features["avg_comments"] == 0):
        suggestion += 'adding more comments to make it more documented and reusable'
    
    if(assignments_score < threshold):
        suggestion += 'diminishing the number of assignments in your lines'

    print("This is the line_len_score: " + str(line_len_score))
    print("This is the parentheses_score: " + str(parentheses_score))
    print("This is the periods score: " + str(periods_score))
    print("This is the assignments score: " + str(assignments_score))

    score = model.predict(features)

    print("This is the model prediction: " + str(score))

    dic = {"readabilityScore" : float(score[0]), "suggestion" : suggestion}
    response = make_response(dic)

    return response

@app.route('/get_scores',methods = ['POST'])
def get_all():
    data = request.data
    data = data.decode('utf-8')
    all_vars = get_features.get_vars(data)
    dic_features = get_features.get_readability_metrics(all_code = data, vars = all_vars)

    files = json.loads(data)

    model = pickle.load(open('linear_model.sav', 'rb'))

    scores = {}
    for f in files:
        dic_features = get_features.get_readability_metrics(files[f])
        features = np.array(list(dic_features.values()))

        # reshaping it so it is 2D
        features = features.reshape(1,-1)

        score = model.predict(features)
        scores[f] = float(score[0])

    print(scores)
    response = make_response(scores)
    return response
    


if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=5000, debug=True)