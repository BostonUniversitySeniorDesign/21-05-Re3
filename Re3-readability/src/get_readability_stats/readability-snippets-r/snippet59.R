# as above, the following code is used to calculate new CIs and then these
# were put in to Table A13 manually
coefs.MNCclusterUS <- MNC.clusterdisbUS[,1] 
std_err.MNCclusterUS <- MNC.clusterdisbUS[,2]
std_err.MNCclusterUS # new SEs
CI_L_MNCclusterUS <- coefs.MNCclusterUS - 1.99*std_err.MNCclusterUS
CI_U_MNCclusterUS <- coefs.MNCclusterUS + 1.99*std_err.MNCclusterUS
cbind(CI_L_MNCclusterUS,CI_U_MNCclusterUS)
CI_L_MNCcluster2US <- coefs.MNCclusterUS - 1.96*std_err.MNCclusterUS
CI_U_MNCcluster2US <- coefs.MNCclusterUS + 1.96*std_err.MNCclusterUS
cbind(CI_L_MNCcluster2US,CI_U_MNCcluster2US)
CI_L_MNCcluster3US <- coefs.MNCclusterUS - 1.65*std_err.MNCclusterUS
CI_U_MNCcluster3US <- coefs.MNCclusterUS + 1.65*std_err.MNCclusterUS
cbind(CI_L_MNCcluster3US,CI_U_MNCcluster3US)