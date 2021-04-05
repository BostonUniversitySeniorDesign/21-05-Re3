## bootstrap
Boot = 10^3
DID  = rep(0, Boot)
LDV  = DID
N    = length(G)
for(boot in 1:Boot)
{
  index    = sample(1:N, replace = TRUE)
  YbeforeB = wided$Ybefore[index]
  YafterB  = wided$Yafter[index]
  GB       = wided$G[index]
  
  DID[boot]  = lm(I(YafterB - YbeforeB) ~ GB)$coef[2]
  LDV[boot]  = lm(YafterB ~ GB + YbeforeB)$coef[2]
}

quantile(DID - LDV, c(0.025, 0.05, 0.5, 0.95, 0.975))
