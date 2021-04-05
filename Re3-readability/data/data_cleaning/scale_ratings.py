import pandas as pd
import numpy as np

df = pd.read_csv('matrix_of_ratings.csv')
df = df.drop(df.columns[[0]], axis=1)
print(df)

scaled_df = df

arr = []
first = 1
for column in df:
    if(first == 1):
        first = 0
        continue
    arr = df[column].values.astype(int)
    #print(arr)
    for i in range(100):
        if (arr[i]%2 == 1):
            arr[i] = arr[i]/2 + 1
        else:
            arr[i] = arr[i]/2
    #print(arr, "\n\n")
    scaled_df[column] = arr


df.replace(0, np.nan, inplace=True)

average_ratings_scaled_df = scaled_df['filename'].to_frame()
average_ratings_scaled_df['snippet score'] = scaled_df.mean(axis=1)

df.replace(np.nan, 0, inplace=True)
print(scaled_df)

print(average_ratings_scaled_df)

scaled_df.to_csv("matrix_of_scaled_ratings.csv")
average_ratings_scaled_df.to_csv("average_ratings_scaled.csv")

