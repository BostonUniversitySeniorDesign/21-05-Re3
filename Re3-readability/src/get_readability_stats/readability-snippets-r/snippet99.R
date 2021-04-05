k<-length(ws)
	for(i in c(2:k)){
		x<-s.out[[i]][["stats"]][[1]]
		pred1<-rbind(pred1,x)
	}
pred1<-data.frame(pred1,ws)

z.out<-non2
x.out<-setx(z.out,mdevsd=ws, hist_non12=hisnon, grow=gr,secondhalf=sh,exchange=ex,syr=sy,energy_diff=en)
s.out<-sim(z.out,x=x.out,num=50000)
pred2<-s.out[[1]][["stats"]][[1]]
k<-length(ws)
	for(i in c(2:k)){
		x<-s.out[[i]][["stats"]][[1]]
		pred2<-rbind(pred2,x)
	}
pred2<-data.frame(pred2,ws)