se.est.plot <- c(sd(brazil.data$voteintent[brazil.data$education < 4 & brazil.data$cred_vs_less==0], na.rm=T)/
  sqrt(sum(is.na(brazil.data$voteintent[brazil.data$education < 4 & brazil.data$cred_vs_less==0])==0)),
 sd(brazil.data$voteintent[brazil.data$education < 4 & brazil.data$cred_vs_less==1], na.rm=T)/
  sqrt(sum(is.na(brazil.data$voteintent[brazil.data$education < 4 & brazil.data$cred_vs_less==1])==0)),
 sd(brazil.data$voteintent[brazil.data$education==4 & brazil.data$cred_vs_less==0], na.rm=T)/
  sqrt(sum(is.na(brazil.data$voteintent[brazil.data$education==4 & brazil.data$cred_vs_less==0])==0)),
 sd(brazil.data$voteintent[brazil.data$education==4 & brazil.data$cred_vs_less==1], na.rm=T)/
  sqrt(sum(is.na(brazil.data$voteintent[brazil.data$education==4 & brazil.data$cred_vs_less==1])==0)),
 sd(argentina.data$voteintent[argentina.data$education < 3 & argentina.data$cred_vs_less==0], na.rm=T)/
  sqrt(sum(is.na(argentina.data$voteintent[argentina.data$education < 3 & argentina.data$cred_vs_less==0])==0)),
 sd(argentina.data$voteintent[argentina.data$education < 3 & argentina.data$cred_vs_less==1], na.rm=T)/
  sqrt(sum(is.na(argentina.data$voteintent[argentina.data$education < 3 & argentina.data$cred_vs_less==1])==0)),
 sd(argentina.data$voteintent[argentina.data$education==3 & argentina.data$cred_vs_less==0], na.rm=T)/
  sqrt(sum(is.na(argentina.data$voteintent[argentina.data$education==3 & argentina.data$cred_vs_less==0])==0)),
 sd(argentina.data$voteintent[argentina.data$education==3 & argentina.data$cred_vs_less==1], na.rm=T)/
  sqrt(sum(is.na(argentina.data$voteintent[argentina.data$education==3 & argentina.data$cred_vs_less==1])==0)))