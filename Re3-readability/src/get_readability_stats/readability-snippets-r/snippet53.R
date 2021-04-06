# INPUT NOTES:
  # you have intransitivity (IT) if S[i,j] > 0 and S[j,i] > 0.
  # you have short intransitivities (SIT), the kind you like to report, if 0 < S[i,j] < 3 and 0 < S[j,i] < 3

  # The following determines the number of steps in an intransitive relationship between row i and column j in matrix IT (0 or NA indicate no intransitivity).
   IT <-matrix(data=NA, nrow=ncol(S), ncol=ncol(S))
  SIT <-matrix(data=NA, nrow=ncol(S), ncol=ncol(S))		# Short Intrantivities (those with four or less steps in the cycle)
  for(i in 1:nrow(S)){
    for(j in 1:i){
      # IT[i,j]<- ifelse( (S[i,j]>0 & S[j,i]>0), 1, NA)
       IT[i,j]<- ifelse( (S[i,j]>0 & S[j,i]>0), (S[i,j] + S[j,i]), NA)
      SIT[i,j]<- ifelse( (S[i,j]>0 & S[j,i]>0 & S[i,j] + S[j,i]< 5), (S[i,j] + S[j,i]), NA)
    }
  }