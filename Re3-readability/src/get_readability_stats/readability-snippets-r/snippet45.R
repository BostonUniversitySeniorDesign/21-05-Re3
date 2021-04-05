# Construct weights for inverse probability weighting
pscore <- lm(obama~factor(year),data=hall)$fit
wt <- 1/pscore
wt[hall$obama==0] <- (1/(1-pscore))[hall$obama==0]

notna <- !is.na(hall$fruit) #remove NAs

#calculate mean of outcome variable (choosing fruit), by year and treatment assignment
means0 <- c(by(hall$fruit,hall$treat_year,mean,na.rm=TRUE)) 
#calculate standard errors
ses0 <- (c(by(hall$fruit,hall$treat_year,var,na.rm=TRUE))/
          c(by(notna,hall$treat_year,sum,na.rm=TRUE)))^.5 
#ns <- c(by(notna,hall$treat_year,sum,na.rm=TRUE))