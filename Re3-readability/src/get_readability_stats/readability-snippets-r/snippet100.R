### inference on cumulative effects
cumulative_tests <- function(model,no_robust_se = F) {
  m <- 8
  k <- length(coef(model))	
  cum_eff <- cumsum(coef(model)[4:m])
  L <- matrix(rep(0,5*k),nrow=5,ncol=k)
  L[,4] <- 1
  L[-1,5] <- 1
  L[-(1:2),6] <- 1
  L[-(1:3),7] <- 1
  L[5, m] <- 1
  se_cum <- sqrt(diag(L%*%vcovHC(model, type="HC0",cluster="group")%*%t(L)))
  