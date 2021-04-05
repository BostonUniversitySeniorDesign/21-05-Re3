for(i in 1:length(vars)){
  c.sub <- na.omit(c[, c(vars[i], "DifDPct")])
  c.sub$d.share <- c.sub$DifDPct
  c.sub$dw <- c.sub[, vars[i]]
  fit.close <- subset(c.sub, d.share >= window.left & d.share <= window.right)
  fit.low <- subset(c.sub, d.share >= window.left & d.share < cut)## For left-hand side subset
  lm.low <- lm(dw ~ d.share , data = fit.low)
  slope.left[i] <- summary(lm.low)$coefficients[2, 3]
  fit.high <- subset(c.sub, d.share >= cut & d.share <= window.right) ## For right-hand side subset
  lm.high <- lm(dw ~ d.share, data = fit.high)
  slope.right[i] <- summary(lm.high)$coefficients[2, 3]
  estimate <- (coef(lm.high)[1] + coef(lm.high)[2] * cut) - (coef(lm.low)[1] + coef(lm.low)[2] * cut) ## Estimate discontinuity
  new.obs <- data.frame(d.share = cut) ## New dataset with d.share set to cutpoint
  se.ctrl <- sqrt(vcovHC(lm.low, type = "HC3")[1, 1]
                  + new.obs^2 * vcovHC(lm.low, type = "HC3")[2, 2]
                  + 2 * new.obs * vcovHC(lm.low, type = "HC3")[2, 1])