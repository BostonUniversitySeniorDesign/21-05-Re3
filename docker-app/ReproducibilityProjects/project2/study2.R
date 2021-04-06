# This version: August 8, 2019
# R version 3.5.1 (2018-07-02) -- "Feather Spray"

## packages ####
library(ggplot2)
library(gridExtra)

#### load data ####
dat <- read.csv("study2_data.csv")

### descriptive stats of DV #####
mean(dat$qualityrating, na.rm=TRUE)
sd(dat$qualityrating, na.rm=TRUE)
median(dat$qualityrating, na.rm=TRUE)

### create function that provides the standard deviation, standard error of the mean, and a (default 95%) confidence interval ####

summarySE <- function(data=NULL, measurevar, groupvars=NULL, na.rm=FALSE,
                      conf.interval=.95, .drop=TRUE) {
  library(plyr)
  
  # New version of length which can handle NA's: if na.rm==T, don't count them
  length2 <- function (x, na.rm=FALSE) {
    if (na.rm) sum(!is.na(x))
    else       length(x)
  }
  
  # This does the summary. For each group's data frame, return a vector with
  # N, mean, and sd
  datac <- ddply(data, groupvars, .drop=.drop,
                 .fun = function(xx, col) {
                   c(N    = length2(xx[[col]], na.rm=na.rm),
                     mean = mean   (xx[[col]], na.rm=na.rm),
                     sd   = sd     (xx[[col]], na.rm=na.rm)
                   )
                 },
                 measurevar
  )
  
  # Rename the "mean" column    
  datac <- rename(datac, c("mean" = measurevar))
  
  datac$se <- datac$sd / sqrt(datac$N)  # Calculate standard error of the mean
  
  # Confidence interval multiplier for standard error
  # Calculate t-statistic for confidence interval: 
  # e.g., if conf.interval is .95, use .975 (above/below), and use df=N-1
  ciMult <- qt(conf.interval/2 + .5, datac$N-1)
  datac$ci <- datac$se * ciMult
  
  return(datac)
}

### end of function ####

## Figure 1: Mean Response Quality Score by Experimental Condition####
datq <- summarySE(dat, measurevar="qualityrating", groupvars=c("dearjake"), na.rm=T)
datq

q <- ggplot(datq, aes(x=dearjake, y=qualityrating)) + 
  geom_errorbar(aes(ymin=qualityrating-se*1.96, ymax=qualityrating+se*1.96), width=.2) +
  geom_point(size=2) +
  xlab("") +
  ylab("Mean Rating of Overall Response Quality (0-100)") +
  theme_bw() +
  ggtitle("") +
  theme(axis.text=element_text(size=14),axis.title=element_text(size=13), plot.title = element_text(size = 18)) +
  scale_x_discrete(limits=c(0,1),
                   labels=c("Not Friendly", "Friendly")) +
  scale_y_continuous(limits=c(45,60))


datqa <- summarySE(dat, measurevar="qualityrating", groupvars=c("answer"), na.rm=T)
datqa

qa <- ggplot(datqa, aes(x=answer, y=qualityrating)) + 
  geom_errorbar(aes(ymin=qualityrating-se*1.96, ymax=qualityrating+se*1.96), width=.2) +
  geom_point(size=2) +
  xlab("") +
  ylab("") +
  ggtitle("   ") +
  theme_bw() +
  theme(axis.text=element_text(size=14),axis.title=element_text(size=13), plot.title = element_text(size = 18)) +
  scale_x_discrete(limits=c(0,1),
                   labels=c("Contact Info", "Answer")) +
  scale_y_continuous(limits=c(45,60))

title <- textGrob("Study 2", gp = gpar(cex = 1.5))

#### (Figure 1, right panel) ####
grid.arrange(q,qa, ncol=2, top=title)

## Figure 2: Effect of Number of Days Until Response on Quality Rating ####
daysplot<-ggplot(dat, aes(days, qualityrating)) + 
  geom_smooth(span=.7, method="loess", color="darkblue") +
  theme_bw() +
  theme(axis.text=element_text(size=14),axis.title=element_text(size=16), plot.title = element_text(size = 18)) +
  xlab("Days Until Legislator Response") +
  ylab("Mean Rating of Overall Response Quality (0-100)") +
  ggtitle("Study 2")  +
  coord_cartesian(ylim=c(45,70))

#### (Figure 2, right panel) ####
daysplot

### Appendix Table 4: Effects of Random Treatment Variables on Email Evaluations: Study 2 ####

## DV: quality rating #####
model1 <- lm(qualityrating ~  dearjake + answer + days, data=dat)
summary(model1)

## DV: friendliness ####
model2 <- lm(friendlyrating ~ dearjake + answer + days, data=dat)
summary(model2)

## DV: helpfulness  ####
model3 <- lm(helpfulrating ~ dearjake + answer + days, data=dat)
summary(model3)

#### Multiple comparisons adjustments ####

## Holm correction: friendly ####

# difference in means tests: dear jake
t.test(qualityrating ~ dearjake, data=dat)
t.test(helpfulrating ~ dearjake, data=dat)
t.test(friendlyrating ~ dearjake, data=dat)

# choose alpha level
alpha <- 0.05

# get p values from diff in means tests (unpack if abbreviated by R)
p1 <- t.test(qualityrating ~ dearjake, data=dat)$p.value
p2 <- t.test(helpfulrating ~ dearjake, data=dat)$p.value
p3 <- 0.000000082

# put in vector from smallest to largest
p <- c(p3, p1, p2)

# conduct correction
# and compare to target alpha
holm_sig <- p.adjust(p, "holm") < alpha
holm_sig

bonferroni_sig <- p.adjust(p, "bonferroni") < alpha
bonferroni_sig

#### Holm correction: answer ####

# difference in means tests: answer
t.test(qualityrating ~ answer, data=dat)
t.test(helpfulrating ~ answer, data=dat)
t.test(friendlyrating ~ answer, data=dat)

# choose alpha level
alpha <- 0.05

# get p values from diff in means tests (unpack if abbreviated by R)
p1 <- t.test(qualityrating ~ answer, data=dat)$p.value
p2 <- t.test(helpfulrating ~ answer, data=dat)$p.value
p3 <- t.test(friendlyrating ~ answer, data=dat)$p.value

# put in vector from smallest to largest
p <- c(p2, p3, p1)
p

# conduct correction
# and compare to target alpha
holm_sig <- p.adjust(p, "holm") < alpha
holm_sig

bonferroni_sig <- p.adjust(p, "bonferroni") < alpha
bonferroni_sig



