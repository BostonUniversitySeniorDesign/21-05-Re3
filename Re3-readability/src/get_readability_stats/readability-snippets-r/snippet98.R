## function to calculate STATA-style clustered standard errors
cl <- function(dat,fm, cluster){
  M <- length(unique(cluster))
  N <- length(cluster)
  K <- fm$rank
  dfc <- (M/(M-1))*((N-1)/(N-K))
  uj  <- apply(estfun(fm),2, function(x) tapply(x, cluster, sum));
  vcovCL <- dfc*sandwich(fm, meat=crossprod(uj)/N)
  coeftest(fm, vcovCL)}

## set working directory
#setwd(" ... ")

## read in the main dataset 
jop <- read.dta("EzrowHomolaTavits_WhenExtremismPays_Data.dta")
jop_pc <- subset(jop, postcom==1)
jop_ad <- subset(jop, advind==1)