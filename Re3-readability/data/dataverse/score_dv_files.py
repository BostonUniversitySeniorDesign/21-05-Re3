import pandas as pd
import numpy as np
import pickle
import seaborn as sns
import matplotlib.pyplot as plt

# call ML model
def getScore(row):
    features = np.array(list(row.values))
    features = features.reshape(1,-1)
    score = model.predict(features)
    return score[0]


df = pd.read_csv("readability_stats_from_harvard_dataverse.csv", index_col=0)

features_reduced  = df.iloc[:,3:-6]

model = pickle.load(open('../../notebooks/ab_init_model.sav', 'rb'))

# # Uncomment to call model on all files
# df['readability_score'] = features_reduced.apply( getScore, axis=1)
# df.to_csv("features_and_score.csv")

df_scores = pd.read_csv("features_and_score.csv", index_col=0)
df_scores = df_scores[['doi','filename', 'year', 'readability_score']]
print(df_scores)
df_scores.to_csv("dv_scores.csv")