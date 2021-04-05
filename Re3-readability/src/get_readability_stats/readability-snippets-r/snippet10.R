################
#### Figure 2: Access to Development Funds by Year - Raw Data
################
cdf$RP_Leg <- ifelse(cdf$Ruling_Party_Margin>0,1,0)
rd.data_R <- subset(cdf, RP_Leg==1)
rd.data_O <- subset(cdf, RP_Leg==0)

# calculate yearly average for RP legislators
ruling_funds <- NA
for (i in unique(rd.data_R$Start_Year)){
  temp <- rd.data_R[rd.data_R$Start_Year==i,]
  fund_avg <- cbind(temp$Start_Year[1], mean(temp$fund_perc))
  ruling_funds <- rbind(ruling_funds, fund_avg)
}
ruling_funds2 <- data.frame(ruling_funds[2:13,])
colnames(ruling_funds2) <- c("Year", "avg_fund")
ruling_funds3 <- arrange(ruling_funds2, Year)