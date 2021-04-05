####
#### Figure 1 Party Policy Distance and Vote Share
####
####
mod1 <- lm(avs ~ dist, data=jop_ad)
x1 <- c(min(jop_ad$dist), max(jop_ad$dist))
y1 <- predict(mod1, newdata=data.frame(dist=x1))
mod2 <- lm(avs ~ dist, data=jop_pc)
x2 <- c(min(jop_pc$dist), max(jop_pc$dist))
y2 <- predict(mod2, newdata=data.frame(dist=x2))
par(mfrow=c(1,2))
plot(jop_ad$dist, jop_ad$avs, xlim=c(0,6), ylim=c(0,50),
     xlab="Party policy distance", ylab="Vote share",
     main="Advanced democracies")
lines(x=x1, y=y1)