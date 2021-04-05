#COMPARISON EXPERTS vs. DEVIATIONS
#Extracting means for Figures 2 and 3
descr <- data.frame(describe(sel))
data_Nss1 <- data.frame(c("Case 1", "Case 2", "Case 3", "Case 4", "Case 5", "Case 6"),
                        c("Luxembourg 1999", "Canada 2006", "Netherlands 2017", "Portugal 1991", "United Kingdom 1959", "Slovakia 2012"),
                        descr$mean[1:6], c(-0.130, -0.084, -0.114, 0.191, 0.113, 0.287),          #adding ds1 values
                        descr$mean[7:12], c(0.145, 0.091, 0.184, -0.215, -0.169, -0.266))         #adding dNs values
colnames(data_Nss1) <- c("case", "label", "s1_exp", "s1_d", "Ns_exp", "Ns_d")
View(data_Nss1)
rm(descr)

#FIGURE 2: LARGEST PARTY SHARE 
#Experts vs. d_s1
m.s1 <- lm(data_Nss1$s1_d ~ data_Nss1$s1_exp)
summary(m.s1)