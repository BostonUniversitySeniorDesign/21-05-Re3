#######http://redistricting.lls.edu/who-partyfed.php
bipartisan <- c("HI", "ID","WA", "NJ", "CA")
divided <- c("CO","CT","IA","KY","ME","MN","MO","NM","NV","NY","OR")
split <-  c("CO","CT","HI","IA","ID","KY","ME","MN","MO","NM","NV","NY","WA", "CA", "NJ") 
dem   <-  c("AR", "IL", "MD", "MA", "WV", "RI")
rep   <-  c("FL","IN", "KS", "MI", "NC", "NE", "NH", "OH", "OK", "PA", "TN", "UT", "WI")
VRA   <-  c("AL","AK","AZ","LA","MS","SC","TX","VA")
#####################


results <- tbl_df(results)
results <- filter(results, st != "GA") # remove GA because of missing votes.

results2 <- results %>%
  mutate(ObamaPct = obama/(obama + mccain), # Calcutlate Obama share
         ProbDem = pred(ObamaPct))  # Calculate prob of Democrat victory.
