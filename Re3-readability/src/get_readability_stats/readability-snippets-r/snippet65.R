  ci <- ci.table(models[[1]])
  for(i in 2:length(models)){
    ci <-merge(ci, ci.table(models[[i]]), by="vars", all.x=T, all.y=T, sort=F)
  }
  
  for(i in 1:ncol(ci)){
    ci[,i] <-as.character(ci[,i])
    hazards[,i] <-as.character(hazards[,i])
  }
  results <-as.data.frame(matrix(NA, ncol=ncol(hazards), nrow=nrow(hazards)*2))
  results[seq(1,nrow(results)-1, by=2),] <- hazards
  results[seq(2,nrow(results), by=2),] <- ci
  results[seq(2,nrow(results), by=2),1] <-""