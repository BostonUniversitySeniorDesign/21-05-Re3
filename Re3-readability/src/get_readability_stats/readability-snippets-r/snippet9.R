# Load "hhdata.Rda" (file contains all solar and control households, including those with missing targetsmart data)
# Load "hhdata.matches.Rda" (file contains only matched pairs of households where both have targetsmart data)

#descriptives for all adopters
stargazer(hhdata[hhdata$type=="solar",c(4,7,8,21,17,18,19,24,20,9,10,11,12,16,15)], summary.stat=c("n", "mean", "sd", "min", "max"), type="latex", header=FALSE)
#descriptives for all matched controls
stargazer(hhdata[hhdata$type=="control",c(4,7,8,21,17,18,19,24,20,9,10,11,12,16,15)], summary.stat=c("n", "mean", "sd", "min", "max"), type="latex", header=FALSE)

#descriptives by quintile
scores.bystrat.type <- hhdata[ , .(.N, mean(tsmart_partisan_score_hhmean, na.rm=TRUE), mean(dem.prop, na.rm=TRUE), mean(rep.prop, na.rm=TRUE), mean(voteg.prop, na.rm=TRUE), mean(votep.prop, na.rm=TRUE)),keyby=.(strat, type)]
names(scores.bystrat.type) <- c("Solar density quintile", "Type", "N", "Partisan score mean", "Prop. Dem.", "Prop. Rep.", "Vote general", "Vote primary")
stargazer(scores.bystrat.type, summary=FALSE, header=FALSE,type="latex")

#number of individuals in each group
sum(hhdata.matches$n.hh[hhdata.matches$type=="solar"])
sum(hhdata.matches$n.hh[hhdata.matches$type=="control"])