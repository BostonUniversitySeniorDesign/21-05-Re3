## percentage correct

overall.percent <- (sum(correct, 
            na.rm = T)/sum(!is.na(correct))) * 100 ## 88.5
yea.percent <- (sum(correct[votes == 
            1], na.rm = T)/sum(!is.na(correct[votes == 1]))) * 
            100 ## 96.0
nay.percent <- (sum(correct[votes == 0], na.rm = T)/sum(!is.na(correct[votes == 
            0]))) * 100 ## 62.8

## percentage correct by legislator

lp <- apply(correct, 1, pscl:::tally) * 100