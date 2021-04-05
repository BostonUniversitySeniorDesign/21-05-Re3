# create table with standard errors

tplot1.se <- matrix(apply(props.boot.1vs2$t, 2, sd), nrow = 3, byrow = F)

tplot1.w.se <- t(rbind(tplot1, tplot1.se[3,])) * 100

colnames(tplot1.w.se) <- c("Condition I", "Condition II", "Difference (II-I)", "s.e.")
rownames(tplot1.w.se) <- c("Disapprove strongly", "Disapprove somewhat", "Neither approve nor disapprove", "Approve somewhat", "Approve strongly", "I'm not sure")

## Condition: partisan cues

dlexpdata$treat3vs4 <- NA
dlexpdata$treat3vs4[dlexpdata$video == 0 & dlexpdata$party.cues == 1] <- 0
dlexpdata$treat3vs4[dlexpdata$video == 1 & dlexpdata$party.cues == 1] <- 1