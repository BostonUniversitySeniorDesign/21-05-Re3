# set list of x values all at mean
oa_range<-seq(0,90,10) 
xhyp <- cfMake(REP_F4, REP_M4_Data, nscen=length(oa_range))

#set OFFICER_UPPER to vary across range as controls held at means
for(i in 1:length(oa_range)){
  xhyp <- cfChange(xhyp, "OFFICER_UPPER", oa_range[i], scen=i)
}

#simulate expected y's given x's, using point estimates and var-cov matrix specified above
yhyp <- logitsimev(xhyp, simbetas, ci=0.95)
REP_M4_EVs<-data.frame(oa_range, yhyp$pe, yhyp$lower, yhyp$upper)
View(REP_M4_EVs)