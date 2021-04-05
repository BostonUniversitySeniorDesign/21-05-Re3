##flag stat sig results
sig<-NA

ind.sig<-c(1,ind) ##add intercept row to indices
ind2.sig<-c(2,ind2) ##add intercept SE row to indices

for(s in 1:( length(covars)+1) ){
	
	lb<-results[ind.sig[s],j]-1.96*results[ind2.sig[s],j] ##compute lower bound of 95% CI
	ub<-results[ind.sig[s],j]+1.96*results[ind2.sig[s],j] ##compute upper bound of 95% CI
	
	if((lb*ub)>0){sig[s]<-1}##if product of upper and lower bound is positive, they are on one side of zero and the result is stat. sig...
	if((lb*ub)<0){sig[s]<-0} ##...if not, result is not stat. sig
	
	
}

sig.list[[j]]<-sig