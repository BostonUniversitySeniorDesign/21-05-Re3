########Effort Plots

#####Evidence of learning during the experiment
roundData$zeff <- NA
for (j in 1:max(roundData$id)) {
	#standardize effort within subjects excluding any that showed no
	#effort or maxed out
	wh <- which(roundData$id == j & roundData$effort < 48 &
		roundData$effort > 0)
	roundData$zeff[wh] <- scale(roundData$effort[wh])
}

par(mfrow = c(2, 2), mar = c(2.5, 2, 4, 1))
plot(0,0, pch='', xlim = c(1,24),
	ylim = c(-3,3), xlab='round', ylab = 
	'Standardized Effort', main = "All Conditions")