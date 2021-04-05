## 2. Descriptive Statistics for Wars not used in Case Studies (N=56) ####

# "The Remaining Cases" exclude Cambodia I, Chad I, Chad II, Angola, and Libya
excl <- c("Cambodia I", "Chad I", "Chad II", "Angola", "Libya") #vector of conflicts to delete
remwars <- filter(wars, !conflict %in% excl) #remaining wars
remrecogs <- filter(recogs, !conflict %in% excl) #remaining recognitions

# Number of extra-constitutional transfers
sum(remwars$extracon) #12

# Number of premature bilateral recogntions
sum(remwars$prem_bilat) #11

# Number of premature recognitions where capital was held prior to bilateral recognition
pre.remrecogs <- filter(remrecogs, !conflict %in% c("South Vietnam")) # filter out S. Vietnam (not premature)
sum(pre.remrecogs$bilat1_capdays >=0) #9