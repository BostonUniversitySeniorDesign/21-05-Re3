# README

## Setting up the env

```
pip install -r requirements.txt
```

## TODO list:

1. Format nicely the feature table (`X`)

```
snippet_id, line_no, avg_line_len, max_line_len....
ID_234, 23, 10, ....
ID_235, ....
```

Code, something along the lines:

```
pd.to_csv("features.csv")
```

2. Create `y` table (ratings)

```
snippet_id, average_rating
ID_234, 6.4
ID_235, 3.5
```

Save as:

```
pd.to_csv("ratings.csv") # add to data
```

3. USE SKLEARN's already built-in funcs :))

- Test different models
- Evaluate their performance (compare to `sklearn.dummy`)


## Steps:

1. evaluate or clean the ratings:
    - identify if someone has given only one rating (1)
    - normalize ratings for each user, if a person rated everything [3-8] you want to broaden this range to [1-10]
    - look for outliners: see dist for each snippet, and then 'clip' outliers 
    - create 'ratings heat map'
    - these are ideas...

2. data analysis [*]:
    - what are takeaways from these ratings, what can we learn
    - What is the best rated code line length? How many comments are best rated? 
    - Potential outcome: "People prefer short code, short code lines"

3. create, evaluate, test the model:
   - list of features: X
   - list of ratings: y
   - test different algorithms, and find the best 

4. deply the model:
   - create a page on Re3 platform to deply the model