# FIGURE 2 in the paper, file fig3b-col.pdf (Color) in the paper
pdf("fig2-col.pdf",width=11,height=5,pointsize=12)
plot(1/sqrt(all.mdm.n), all.mdm,ylim=c(-1000,4200),xlim=c(0.037,1/sqrt(200)),col=rgb(1,0,0,alpha=0.4),cex=0.7,pch=20,xlab="number matched, scaled as 1/sqrt(matched)",ylab="att estimate",  xaxt = "n")
xx1 <- sort(1/sqrt(unique(c(all.mdm.n,all.psm.n,all.cem.n))), decreasing=TRUE)
xx1 <- xx1[which(xx1<1/sqrt(211))]
axis(1, xx1, (1/xx1)^2)
points(1/sqrt(all.psm.n), all.psm,col=rgb(0,1,0,alpha=0.4),cex=0.7,pch=20)
points(1/sqrt(all.cem.n), all.cem,col=rgb(0,0,1,alpha=0.4),cex=0.7,pch=20)
legend(1/sqrt(225),4300, legend=c("stratification", "PSM", "MDM"),col=c("blue","green","red"),pch=rep(20,3))
e.cem <- ellipsoidhull(cbind(1/sqrt(all.cem.n),all.cem))
polygon(predict(e.cem), col=adjustcolor("gray",0.5))

idx <- which(all.psm.n<800 & all.psm.n>210)
e.psm <- ellipsoidhull(cbind(1/sqrt(all.psm.n),all.psm)[idx,])
lines(predict(e.psm),col="green")
