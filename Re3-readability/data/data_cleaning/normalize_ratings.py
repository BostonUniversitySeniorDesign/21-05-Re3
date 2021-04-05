import pandas as pd
import numpy as np
from scipy.interpolate import interp1d

#load csv containing the ratings
df = pd.read_csv('matrix_of_ratings.csv')
df = df.drop(df.columns[[0]], axis=1)

arr = []

# drop ratings for those who skipped or did not complete the survey
# for column in df:
# 	if (0.0 in df[column].values):
# 		print(column ," - Not Full")
# 		print(np.count_nonzero(df[column].values))
# 		arr.append(column)

# drop ratings for those who did not rate at least 20 snippets
for column in df:
	if (np.count_nonzero(df[column].values) < 20):
		#print(column , " - Less than 20 ratings")
		#print(np.count_nonzero(df[column].values))
		arr.append(column)

print(len(arr), "people did not rate enough snippets")

df = df.drop(arr, axis = 1)

print(len(df.columns), " people had enough ratings for normalization\n\n")

df.replace(0, np.nan, inplace=True)
normalized_df = df
arr = []
normalized_arr = []
first = 1
count_normalized = 0
for column in df:
	if(first == 1):
		first = 0
		continue

	arr = df[column].values
	print(column)
	print(arr)

	min = np.nanmin(arr)
	max = np.nanmax(arr)
	print(min, max, "\n\n")

	if (min != 1 or max != 10):
		count_normalized += 1

	# Linear map min and max values of each to a 1-10 floating point rating
	m = interp1d([min,max],[1,10])
	for i in arr:
		normalized_arr.append(float(m(i)))

	normalized_df[column] = normalized_arr
	normalized_arr = []

print(count_normalized, " - people had their ratings normalized")

average_ratings_normalized_df = normalized_df['filename'].to_frame()
average_ratings_normalized_df['snippet score'] = normalized_df.mean(axis=1)

print(average_ratings_normalized_df)

normalized_df.replace(np.nan, 0, inplace=True)
###### save normalized dataframe to csv
normalized_df.to_csv("matrix_of_normalized_ratings.csv")
average_ratings_normalized_df.to_csv("average_ratings_normalized.csv")