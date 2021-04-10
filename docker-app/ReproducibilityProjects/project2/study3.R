# This version: August 8, 2019
# R version 3.5.1 (2018-07-02) -- "Feather Spray"

## load data ####
dat <- read.csv("study3_data.csv")

## change baselines to "neither" ####

dat$friendly <- relevel(dat$friendly, ref="Neither")
dat$content <- relevel(dat$content, ref="Neither")

#### Table 2: Descriptive Statistics of Legislator Emails #####
table(dat$question.answered)
prop.table(table(dat$question.answered))

table(dat$contactinfo)
prop.table(table(dat$contactinfo))

table(dat$namedsalut)
prop.table(table(dat$namedsalut))

table(dat$invitefollowup)
prop.table(table(dat$invitefollowup))

table(dat$automated)
prop.table(table(dat$automated))

mean(dat$words)
sd(dat$words)
median(dat$words)

# Mean rating ####
mean(dat$rating)
sd(dat$rating)
median(dat$rating)

#### Table 3: Effect of Response Characteristics on Satisfaction with Response ####

model <- lm(rating ~ friendly + content +  automated + log(words+1), data=dat)
summary(model)

