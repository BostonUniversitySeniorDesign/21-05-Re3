block_bs_voteshare <- function(){
  nclust <- length(unique(latam2$election))
  levels <- unique(latam2$election)
  samp <- as.vector(sample(levels, size = nclust, replace = T))
  orig <- latam2$election
  dat <- ldply(lapply(samp, FUN = function(x){latam2[orig == x,]}), data.frame)
  
  a1<- (lm(voteshare ~ primary, dat))
  a2<- (lm(voteshare ~ primary + nparties + Decade +country, dat))
  
  return(c(coef(a1)[1:2], coef(a2)[1:4]))
}
