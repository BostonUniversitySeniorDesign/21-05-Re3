import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from matplotlib.cbook import boxplot_stats  

#load csv containing the ratings
df = pd.read_csv('../matrix_of_ratings.csv')
average_ratings_no_outliers_df = df['filename'].to_frame()
df = df.drop(df.columns[[0,1]], axis=1)
df.replace(0, np.nan, inplace=True)

'''
# drop ratings for those who skipped or did not complete the survey
arr = []
for column in df:
    if (0.0 in df[column].values):
    	print(column ," - Not Full")
    	arr.append(column)

print(len(arr), "People did not fully complete survey")
df = df.drop(arr, axis = 1)
'''

count = 0
# Remove outliers from dataframe
for i in range(100):
	outliers = boxplot_stats(df.iloc[i].dropna())[0]['fliers']
	print("snippet ", i+1,  " ", outliers)
	#print(len(outliers))
	count += len(outliers)
	for j in outliers:
		df.iloc[i] = df.iloc[i].replace(j, np.nan)

print("There were ", count, "outliers removed");

average_ratings_no_outliers_df['snippet score'] = df.mean(axis=1)

df.replace(np.nan, 0, inplace=True)
#print(df)

print(average_ratings_no_outliers_df)
# save dataframe to csv
df.to_csv("../matrix_of_ratings_no_outliers.csv")
average_ratings_no_outliers_df.to_csv("../average_ratings_no_outliers.csv")