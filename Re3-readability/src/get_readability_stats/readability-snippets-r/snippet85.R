# Dif in mean around narrow mand
regD1 <- lm(leg/comparecimento~urna,data=rdd)
		robSED1 <- sqrt(diag(vcovHC(regD1,type="HC4m")))
		pD1 <- linearHypothesis(regD1, c("urnaTRUE = 0"),vcov.=vcovHC(regD1,type="HC4m"))$P[2]
		pD1intercept <- linearHypothesis(regD1, c("(Intercept) = 0"),vcov.=vcovHC(regD1,type="HC4m"))$P[2]  	
regD2 <- lm(leg/comparecimento~urna,data=subset(rdd,hdi.1991<median(hdi.1991)))
tabD <- merge(stack.regs(summary(regD1)),stack.regs(summary(regD2))
	,by=c("vars","desc"),all=T,suffixes=c("","lowHDI"))
tabD[which(tabD$desc=="Std. Error"),"v"]<-robSED1  #use robust SE
tabD[which(tabD$desc=="zP-value"),"v"]<-c(pD1,pD1intercept)  #use robust SE

# Nulos and brancos for band
regD3a <- summary(lm(nulosv/comparecimento~urna,data=rdd))
regD3b <- summary(lm(brancosv/comparecimento~urna,data=rdd))