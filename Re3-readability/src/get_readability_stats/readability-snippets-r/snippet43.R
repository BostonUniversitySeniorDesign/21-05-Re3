# Regression test for funnel plot asymmetry (as reported in Section SI.6)
regtest(memodel)

### Regression Models for Studies in the United States (Section SI.8) ####

# Subset data to just studies in the U.S. 
usdat <- subset(dat, country=="US")

# Reproduce the overall response rate (0.536) for studies in the U.S. as reported in the supporting information (Section SI.8)
usremodel<- rma(treat.effect, sei=standard.err, data = usdat)
summary(usremodel)

# Reorder minority.sender variable with Non-minority as baseline
usdat$minority.sender <- as.factor(usdat$minority.sender)
usdat$minority.sender <- relevel(usdat$minority.sender, ref="Non-minority")
