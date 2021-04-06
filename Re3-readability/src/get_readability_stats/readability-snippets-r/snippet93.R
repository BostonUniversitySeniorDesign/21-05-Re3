trendMaker <- function(post, time, newdata){
  l0.boot <- apply( post, 1, function(x) {
    data2 <- data.frame(postdraw = x, time= time)
    if ( nrow(data2) > 6 ){
      m1 <- loess(postdraw ~ time, data=data2)
      return( predict(m1, newdata=newdata) )
      }
    else { 
      m1 <- lm(postdraw ~ time, data=data2)
      return( predict(m1, newdata=newdata) )
      }
    })
  CI.boot <- apply(l0.boot, 1, quantile, probs=c(.025, .5, .975) )
  CI.boot <- data.frame(cbind(t(CI.boot), time=newdata[,"time"]))
  colnames(CI.boot) <- c("L", "M", "U", "time")
  return(CI.boot)
  }