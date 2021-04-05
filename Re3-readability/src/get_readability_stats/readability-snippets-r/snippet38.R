###################################################################################################################
# Code to replicate Figure A1: How conditioning on a post-treatment variable unbalances randomization
###################################################################################################################
beta<-1
par(mgp=c(.3,0,0), mar=c(2,2,1,.25), xaxt="n", yaxt="n", mfrow=c(1,2))
mycol1<-rgb(0,.4,1,alpha=1)
mycol2<-rgb(.4,1,.4,alpha=1)
curve(dnorm, xlim=c(-4,4), lty=2, ylab="Density", xlab="Unmeasured confounder (u)", lwd=2, ylim=c(-.03, .4))
u0 <- curve(dnorm, xlim=c(.2,4), lty=1, add=TRUE, col="black", lwd=0)
polygon(c(.2, u0$x, 4), c(0, u0$y, 0), col=mycol1, border=NA)
segments(.2, 0, .2, dnorm(.2), lty=2)
segments(-beta+.2, 0, -beta+.2, dnorm(-beta+.2), lty=2)