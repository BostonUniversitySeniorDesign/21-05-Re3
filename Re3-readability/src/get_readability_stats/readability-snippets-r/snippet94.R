# Scenario 1 (range of ethnic identity)
shortdata <- cbind(mean(civ),ethnic,mean(attach), mean(pint), 0, mean(pi_afd), mean(pi_fdp), mean(pi_greens),
             mean(pi_left), mean(pi_spd), mean(pi_cducsu), mean(age), mean(edulo), mean(eduhi), mean(female), mean(ost))

# Calculate linear predictor etc.
ystar <- shortdata%*%coef(modelord[1:16]) 
m <- 5
tau <- modelord$zeta
probs <- matrix(nrow=length(ystar),ncol=m)

# Predicted Probailities
probs[,1] <- pnorm(tau[1]-ystar) # 1st category
for (j in 2:(m-1)) # categories inbetween
probs[,j] <- pnorm(tau[j]-ystar) - pnorm(tau[j-1]-ystar)
probs[,m] <- 1-pnorm(tau[m-1]-ystar) # last category