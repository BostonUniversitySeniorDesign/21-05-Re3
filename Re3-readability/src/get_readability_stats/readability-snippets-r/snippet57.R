b.bias<-c()
for(i in 1:dim(dat)[1]){
  
  b.bias[i]<-bias.calc(dat$estimate[i], dat$se[i], (dat$sample_size[i]-dat$num_ivs[i]-1), p=0.9)
  
}
mean(b.bias)                                   # 0.298437             
length(which(b.bias>=0.1))/length(b.bias)      # 0.8732394

dat$b.bias.plot <- 100*(b.bias)

# make category of p-value
dat$t <- abs( dat$estimate / dat$se )
dat$p <- 2*(1 - pt(q=dat$t, df=(dat$sample_size-dat$num_ivs-1)))
dat$p.cat <- cut_interval(dat$p, length=0.01)
dat$bias.cat <- cut_interval(dat$b.bias.plot, length=10)
