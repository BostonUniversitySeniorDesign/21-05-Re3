#effect of isp (through proportion renewable, electricity per gdp [itself direct and through price], and direct effect)
no.isp.price<-mod1$coef[1]+mod1$coef[2]*mean(POLICYII$rpsprop)+mod1$coef[3]*0+mod1$coef[4]*mean(POLICYII$ipp)+mod1$coef[5]*0+mod1$coef[6]*mean(POLICYII$gasPrice);no.isp.price
no.isp.renew<-pnorm(mod2$coef[1]+mod2$coef[2]*mean(POLICYII$rpsprop)+mod2$coef[3]*0+mod2$coef[4]*mean(POLICYII$ipp)+mod2$coef[5]*0+mod2$coef[6]*mean(POLICYII$gdp)+mod2$coef[7]*mean(POLICYII$gasPrice));no.isp.renew
no.isp.eGDP<-mod3$coef[1]+mod3$coef[2]*0+mod3$coef[3]*mean(POLICYII$ipp)+mod3$coef[4]*0+mod3$coef[5]*no.isp.price+mod3$coef[6]*mean(POLICYII$gasPrice);no.isp.eGDP
no.isp<-exp(mod4$coef[1]+mod4$coef[2]*mean(POLICYII$rpsprop)+mod4$coef[3]*0+mod4$coef[4]*mean(POLICYII$ipp)+mod4$coef[5]*0+mod4$coef[6]*mean(POLICYII$gdp)+mod4$coef[7]*no.isp.renew+mod4$coef[8]*no.isp.eGDP+mod4$coef[9]*mean(POLICYII$gasPrice))

yes.isp.price<- mod1$coef[1]+mod1$coef[2]*mean(POLICYII$rpsprop)+mod1$coef[3]*0+mod1$coef[4]*mean(POLICYII$ipp)+mod1$coef[5]*1+mod1$coef[6]*mean(POLICYII$gasPrice);yes.isp.price
yes.isp.renew<-pnorm(mod2$coef[1]+mod2$coef[2]*mean(POLICYII$rpsprop)+mod2$coef[3]*0+mod2$coef[4]*mean(POLICYII$ipp)+mod2$coef[5]*1+mod2$coef[6]*mean(POLICYII$gdp)+mod2$coef[7]*mean(POLICYII$gasPrice));yes.isp.renew
yes.isp.eGDP<- mod3$coef[1]+mod3$coef[2]*0+mod3$coef[3]*mean(POLICYII$ipp)+mod3$coef[4]*0+mod3$coef[5]*yes.isp.price+mod3$coef[6]*mean(POLICYII$gasPrice);yes.isp.eGDP
yes.isp<-exp(mod4$coef[1]+mod4$coef[2]*mean(POLICYII$rpsprop)+mod4$coef[3]*0+mod4$coef[4]*mean(POLICYII$ipp)+mod4$coef[5]*1+mod4$coef[6]*mean(POLICYII$gdp)+mod4$coef[7]*yes.isp.renew+mod4$coef[8]*yes.isp.eGDP+mod4$coef[9]*mean(POLICYII$gasPrice))

no.isp;yes.isp
100*(no.isp-yes.isp)/no.isp