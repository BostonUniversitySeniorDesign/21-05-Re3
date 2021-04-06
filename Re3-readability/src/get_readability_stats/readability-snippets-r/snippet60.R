betaFE <- matrix(coef(first.lm)[1:10], ,1)
u.hat <- y.mean <- res.mean <- coor.mean <- avemag.mean <- rep(NA, n)
first.res <- resid(first.lm)
for (i in 1:n){
  res.mean[i] <- mean(first.res[master0$id==i])
  y.mean[i] <- mean(first.lm$y[master0$id==i])
  x.mean <- matrix(apply(subset(master0, id==i), 2, mean)[1:10], 1, )
  u.hat[i] <- y.mean[i] - x.mean%*%betaFE - res.mean[i]
}
## Regress e with x using n = number of groups
for (i in 1:n){
  coor.mean[i] <- mean(master$stand.pca[master$id==i])
  avemag.mean[i] <- mean(log(master$avemag2[master$id==i])) 
}
coor.mean2 <- coor.mean^2
second.lm <- lm(u.hat ~ coor.mean + coor.mean2 + avemag.mean - 1)
second.res <- resid(second.lm)