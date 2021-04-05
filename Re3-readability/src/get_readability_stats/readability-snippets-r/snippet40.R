##Create Figure 2

library(gplots)

plotmatrix1<-matrix(c(meanthought1,meanthought2,meanimp1,meanimp2,meanagree1,meanagree2),nrow=2,ncol=3,byrow=F)
cilmatrix1<-matrix(c(confthought1[1],confthought2[1],confimp1[1],confimp2[1],confagree1[1],confagree2[1]),nrow=2,ncol=3,byrow=F)
ciumatrix1<-matrix(c(confthought1[2],confthought2[2],confimp1[2],confimp2[2],confagree1[2],confagree2[2]),nrow=2,ncol=3,byrow=F)

barplot2(plotmatrix1,beside=T,plot.ci=T,ci.l=cilmatrix1,ci.u=ciumatrix1,main="Reactions to Expert Arguments",ylab = "Less --------------------- More",names.arg=c("Thought About","Consider Important","Agree with"),ylim=c(0,3),col=c(gray(.25),gray(.75)))
legend(x=1,y=3,legend=c("Expert in Minority (N=23)","Expert in Majority (N=33)"),fill=c(gray(.25),gray(.75)))

#T-tests reported in 3rd paragraph of results section

t.test(nexpdat$meanexpthought[which(nexpdat$majexp==0)], nexpdat$meanexpthought[which(nexpdat$majexp==1)],na.rm=T, alternative="greater")
t.test(nexpdat$meanexpimp[which(nexpdat$majexp==0)], nexpdat$meanexpimp[which(nexpdat$majexp==1)],na.rm=T, alternative="greater")
t.test(nexpdat$meanexpagree[which(nexpdat$majexp==0)], nexpdat$meanexpagree[which(nexpdat$majexp==1)],na.rm=T, alternative="greater")