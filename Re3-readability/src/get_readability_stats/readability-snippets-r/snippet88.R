########
########
###FIGURE B4 HERE
########
########
pdf("news-effect-comparison.pdf",height=5, width=6.5)
par(mar=c(4,7.5,4,1))
plot(y=5:1,x=news.comparison.frame[,1],pch=16,cex=2,xlim=c(0,.3),yaxt='n',ylab='',xlab='Effect of Co-Partisan Source',main='Partisan Selective Exposure Study')
segments(y0=5:1,x0=news.comparison.frame$lower,x1=news.comparison.frame$upper,lwd=4)
abline(h=3.5,lty=2)
axis(side=2,at=5:1,labels=c('Mummolo 2016
(Mturk)','Mummolo 2016
(SSI)','This Study
(Mturk-1)','This Study
(Mturk-2)','This Study
(Qualtrics)'),las=1)
dev.off()