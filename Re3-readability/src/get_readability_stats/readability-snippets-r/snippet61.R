usainst<-data.frame(usinst, usaidprterr)
alpha(usainst, na=T)
uscombinst<-usinst+usaidprterr
median(uscombinst, na.rm=TRUE)

### usinstrumentalist dummy
 
usinsdum<-ifelse(uscombinst<=6, 0, 1)

###  UK combined instrumentalist
ukinsta<-data.frame(ukinst, ukaidprterr)
alpha(ukinsta, na=T)
ukcombinst<-ukinst+ukaidprterr
median(ukcombinst, na.rm=TRUE)

##uk instrumentalist dummy
ukinsdum<-ifelse(ukcombinst<=6, 0, 1)