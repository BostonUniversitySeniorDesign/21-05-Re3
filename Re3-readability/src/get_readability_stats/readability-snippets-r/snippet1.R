################################################### 
## TABLE 4 - Independents (AMOS columns) 
###################################################
amos$ind<-ifelse(amos$party==3,1,0)
#ALL
t.test(amos$dv_policy[amos$ind==1&amos$tr_diff_repub==0],amos$dv_policy[amos$ind==1&amos$tr_diff_repub==1])
length(na.omit(amos$dv_policy[amos$ind==1])) #N
(se.ind.all<-sqrt(sd(na.omit(amos$dv_policy[amos$ind==1&amos$tr_diff_repub==0]))^2 / 
                   length(na.omit(amos$dv_policy[amos$ind==1&amos$tr_diff_repub==0])) + 
                   sd(na.omit(amos$dv_policy[amos$ind==1&amos$tr_diff_repub==1]))^2 / 
                   length(amos$dv_policy[amos$ind==1&amos$tr_diff_repub==1])))

#BOTH
t.test(amos$dv_policy[amos$ind==1&amos$tr_diff_repub==0&(amos$tr_diff_both==1)],
       amos$dv_policy[amos$ind==1&amos$tr_diff_repub==1&(amos$tr_diff_both==1)])