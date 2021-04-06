library(tidyverse)

load("CottrellLSQreplication.Rdata")



# Estimate logit function for transforming presidential votes -------------

# Fit a logit model that links McCain's vote share in a district to an indicator for
# whether the seat is held by a Republican for Congress 110-113. Extract the coefficients
# and create a function for transforming Obama's vote share in 2008 into a predicted
# probabilit for whether a Democrat wins the seat in that district.
m <- glm(republican~mcshare, family=binomial(link='logit'), data=logitdata)

print(m$coefficients[[1]], digits = 14)
# -9.5749838078334
print(m$coefficients[[2]], digits = 14)
# 20.159260699169

pred <- function(ob){
  xb <- -9.5749838078334 + (1-ob)*20.159260699169
  return (1- plogis(xb))
}



# Plot logistic function for Figure A1 -------------------------------------


#Obama's nationwide voteshare
#69498516 /(59948323 + 69498516)
oshare <- 0.53688847512


o <- seq(.25,.75,.001)
df <- data.frame(
  ob = o,
  prob = pred(o)
)

pts <- c(.25, .50, .75)
df2 <- data.frame(
  x1 = 1- (qlogis(1 - pts) + 9.5749838078334)/20.159260699169,
  y1 = 0,
  x2 = 1- (qlogis(1 - pts) + 9.5749838078334)/20.159260699169,
  y2 = pts
)

df3 <- data.frame(
  y = c(.25/2, .25/2 * 3,  .25/2 * 5, .25/2 * 7),
  x =  .25,
  texts = c("Safe Republican", "Marginal Republican", "Marginal Democrat", "Safe Democrat")
)

pv <- seq(20,70,5)
df4 <- data.frame(
  ob = oshare + (pv/100 - 50/100),
  pvi = sprintf("%+1.0f", pv - 50)
)


fa1 <- ggplot(df, aes(ob,prob)) + geom_line(size = 1) + 
  geom_segment(data = df2, aes(x = x1, y = y1, xend = x2, yend = y2), linetype = "dotted", size = 2) +
  geom_segment(data = df2, aes(x = .25, y = y2, xend = x2, yend = y2), linetype = "dotted", size = 2) + 
  geom_text(data = df3, aes(x, y, label = texts), hjust= 0, size = 7) +
  scale_x_continuous(breaks = seq(0,1, .05), limits = range(o), name = "\nObama's share of the 2-party vote") +
  scale_y_continuous(breaks = seq(0,1, .25), limits = c(0,1), name = "Probability of a Democratic victory\n") +
  theme_bw() + theme(axis.text = element_text(size = 18),axis.title = element_text(size = 18)) 

ggsave(fa1, filename = "FigureA1.jpg", height = 7, width = 9, device = "jpeg")




# Define regimes and prepare data ----------------------------------------------

########http://redistricting.lls.edu/who-partyfed.php
bipartisan <- c("HI", "ID","WA", "NJ", "CA")
divided <- c("CO","CT","IA","KY","ME","MN","MO","NM","NV","NY","OR")
split <-  c("CO","CT","HI","IA","ID","KY","ME","MN","MO","NM","NV","NY","WA", "CA", "NJ") 
dem   <-  c("AR", "IL", "MD", "MA", "WV", "RI")
rep   <-  c("FL","IN", "KS", "MI", "NC", "NE", "NH", "OH", "OK", "PA", "TN", "UT", "WI")
VRA   <-  c("AL","AK","AZ","LA","MS","SC","TX","VA")
#####################


results <- tbl_df(results)
results <- filter(results, st != "GA") # remove GA because of missing votes.

results2 <- results %>%
  mutate(ObamaPct = obama/(obama + mccain), # Calcutlate Obama share
         ProbDem = pred(ObamaPct))  # Calculate prob of Democrat victory.

# Seperate simulated results from actual results
cdresults <- results2 %>% filter(version == "cd113") %>% select(st, district,ActObamaPct = ObamaPct, ActProbDem = ProbDem)%>% arrange(st, ActProbDem) %>% group_by(st) %>% mutate(district = row_number()) 

simresults <- results2 %>% filter(version != "cd113") %>% transmute(version, st, district, SimObamaPct = ObamaPct, SimProbDem = ProbDem)  %>% arrange(version, st, SimProbDem) %>% group_by(version, st) %>% mutate(district = row_number())



# Plot Tennessee results for Figure 2 --------------------------------------

# functions for computing bounds of confidence intervals
c95high <- function(x) quantile(x,probs = .975)
c95low  <- function(x) quantile(x,probs = .025)

fortn <- results2 %>% filter(st == "TN") %>% 
  group_by(version) %>% 
  arrange(ObamaPct) %>% 
  mutate( 
    District = row_number(), 
    Type = ifelse(version == "cd113", "actual", "simulated")
    )
fortnact <- fortn %>% ungroup %>% filter(Type == "actual") 
fortsim <- fortn %>% ungroup %>% filter(Type == "simulated") 
f2 <- ggplot(fortsim, aes(District, ObamaPct, colour= Type))  + 
  stat_summary(fun.y = mean, fun.ymin = c95low, fun.ymax = c95high,  size = .7, show.legend = FALSE) + 
  geom_point(data = fortnact,size = 3, alpha = .4) + 
  geom_point(data = fortnact,size = 3, shape = 21, colour = "black", stroke = 1) +
  scale_colour_manual(values = c("red", "black"),labels = c("Actual", "Simulated"),  name="") +  
  scale_x_continuous(breaks = 1:9, labels = fortnact$district, name = "\nDistrict") +
  scale_y_continuous(limits = c(0,1), breaks = seq(0,1, .1), labels = seq(0,100, 10),   name = "Percent Obama\n")  + 
  geom_hline(yintercept = .5, linetype = "dashed", size = 1.5)  +
  guides(colour = guide_legend(override.aes = list(alpha=1))) +
  theme_bw() + 
  theme( legend.position = c(.2,.8), 
         legend.key.size =  unit(2, "lines"), 
         legend.text = element_text(size = 14),
         legend.background = element_rect(colour = "black", size = .5, linetype='solid'),
         axis.text = element_text(size = 18),
         axis.title = element_text(size = 16))


ggsave(f2, filename = "Figure2.jpg", height = 6, width = 8, device = "jpeg")



# Calculate PVI and PrWin and plot both distributions for Figure 3 --------------------------------

figure3 <- results2 %>% 
  mutate(
    PVI =  abs(ObamaPct - oshare),
    PrWin =  .5 + abs(ProbDem -.5)
    ) %>%
  group_by(version) %>%
  summarize(PVI = mean(PVI),
            PrWin = mean(PrWin)) %>%
  separate(version, into = c("type","sim"), convert = T, fill = "right")
simdata<- filter(figure3, !is.na(sim)  )
simavg <- filter(figure3, !is.na(sim) ) %>% 
  summarise(
    PVI = mean(PVI),
    PrWin = mean(PrWin))
actdata<- filter(figure3, is.na(sim)  )

f3a <- ggplot(simdata, aes(x = PVI*100, y = ..density..)) + geom_histogram(binwidth = .05, center = 50, colour = "white", fill = "grey") + scale_x_continuous( limits = c(9.9, 13), breaks = seq(0,100,1), labels = paste0("+", seq(0,100,1)))  +  geom_text(data = simavg, aes(x = PVI*100, y=.5, label =  paste0("+",round(PVI, 3)*100)), col = "black", size = 8 ) + geom_point(data=simavg,aes(x = PVI*100, y = 0), col = "black", size = 2.5, fill = "black", shape = 25) + geom_text(data = actdata, aes(x = PVI*100, y= .5, label = paste0("+",round(PVI, 3)*100)), col = "red", size = 8  ) + geom_point(data=actdata,aes(x = PVI*100, y = 0), col = "red", size = 2.5, shape = 25, fill = "red" )  + theme_classic() + ylab("") + xlab("\nAverage Partisan Vote Index (PVI)") + theme(text = element_text(size = 25), axis.text.x  = element_text(size = 25), axis.line.y =element_blank(), axis.text.y  = element_blank(), axis.ticks.y = element_blank())


ggsave(f3a, filename = "Figure3A.jpg", width = 6, height = 4, device = "jpeg")


f3b <- ggplot(simdata, aes(x = PrWin*100, y = ..density..)) + geom_histogram(binwidth = .1, center = 50, colour = "white", fill = "grey") + scale_x_continuous( limits = c(80, 86), breaks = seq(0,100,2), labels = paste0(formatC(seq(0,100,2),digits = 0, format = "f"), "%")) + geom_text(data = simavg, aes(x = PrWin*100, y= .15, label = paste0(round(PrWin,3)*100, "%")), col = "black", size = 8)  + geom_point(data=simavg,aes(x = PrWin*100, y = 0), col = "black", size = 2.5, shape = 25, fill = "black") + geom_text(data = actdata, aes(x = PrWin*100, y= .15, label = paste0(round(PrWin,3)*100, "%")), col = "red", size = 8 ) + geom_point(data=actdata,aes(x = PrWin*100, y = 0), col = "red", size = 2.5, shape = 25, fill = "red")  + theme_classic()  + ylab("") + xlab("\nAverage Probability of Winning") + theme(text = element_text(size =25), axis.text.x  = element_text(size = 25), axis.line.y =element_blank(), axis.text.y  = element_blank(), axis.ticks.y = element_blank())

ggsave(f3b, filename = "Figure3B.jpg", width = 6, height = 4, device = "jpeg")

# Plot histogram for Figure 4 ------------------------------------------------------------------

nms <- c("Safe\nRepublican", "Marginal\nRepublican", "Marginal\nDemocrat", "Safe\nDemocrat")

# 409 Districts, 41 states

cdcut  <- cdresults %>% 
  mutate(bin =cut(ActProbDem,breaks = seq(0,1,.25) )) %>% 
  group_by(bin) %>% 
  summarize(N = n()) %>% 
  mutate( Density= N/sum(N))

simcut <- simresults %>% 
  group_by(version) %>% 
  mutate(bin =cut(SimProbDem,breaks = seq(0,1,.25) )) %>% 
  group_by(version,bin) %>%
  summarize(N=n()) %>% 
  complete(bin,fill = list(N=0)) %>% 
  mutate( Density= N/sum(N))

simcut %>% group_by(bin) %>% summarize( xbar = mean(N)) %>% bind_cols(select(cdcut, N)) %>% mutate(diff = N-xbar)

f4 <- ggplot(data = simcut, aes(x = bin ,y = N)) + 
  geom_bar( stat = "summary", fun.y = "mean",  fill = "grey") +
  stat_summary(fun.y = mean, fun.ymin = c95low, fun.ymax = c95high, size = 1.5, geom = "errorbar",width=.1)  +
  geom_point(data = cdcut, colour = "red",size = 3, alpha = .7) +
  scale_x_discrete(name = "", labels = nms) +
  scale_y_continuous(name = "Number of Districts\n", limits=c(0,200), breaks=seq(0,200, 10), labels = seq(0,200, 10)) +
  theme_bw()+
  theme(axis.text.x = element_text(size = 18),
        axis.text.y = element_text(size = 18),
        axis.title.y = element_text(size = 18),
        axis.title.x = element_text(size = 14))


ggsave(f4, filename = "Figure4.jpg", width = 7, height = 6, device = "jpeg")



# Plot histograms for Figure 5, 6, and A2 ------------------------------------

makehist <- function(subset, yaxis, ylimit) {
  nms <- c("Safe\nRepublican", "Marginal\nRepublican", "Marginal\nDemocrat", "Safe\nDemocrat")
  
  # Count number of districts in each bin
  cdcut  <- cdresults %>% 
    filter(st %in% subset ) %>% 
    mutate(bin =cut(ActProbDem,breaks = seq(0,1,.25) )) %>% 
    group_by(bin) %>% 
    summarize(N = n()) %>% 
    mutate( Density= N/sum(N))
  
  simcut <- simresults  %>% 
    filter(st %in% subset ) %>% 
    group_by(version) %>% 
    mutate(bin =cut(SimProbDem,breaks = seq(0,1,.25) )) %>% 
    group_by(version,bin) %>% summarize(N=n()) %>% 
    complete(bin,fill = list(N=0)) %>% 
    mutate( Density= N/sum(N))
  
  histplot <- ggplot(data = simcut, aes(x = bin ,y = N)) + 
    geom_bar( stat = "summary", fun.y = "mean",  fill = "grey") +
    stat_summary(fun.y = mean, fun.ymin = c95low, fun.ymax = c95high, size = 1.5, geom = "errorbar",width=.1)  +
    geom_point(data = cdcut, colour = "red",size = 4, alpha = .7) +
    scale_x_discrete(name = "", labels = nms) +
    scale_y_continuous(name = "", limits=c(0, ylimit), breaks=yaxis, labels = yaxis) +
    theme_bw()+
    theme(axis.text.x = element_text(size = 18),
          axis.text.y = element_text(size = 18),
          axis.title.y = element_text(size = 18),
          axis.title.x = element_text(size = 14))
  
  return(histplot)
}

### Republican States
# 132 Districts, 13 states
cdresults %>% filter(st %in% rep ) %>% distinct(st) %>% ungroup %>% summarise(n())
f5a <- makehist(rep, seq(0,75, 10), 75)
ggsave(f5a, filename = "Figure5A.jpg", width = 7, height = 6, device = "jpeg")

### Democratic States
# 44 Districts, 6 states
cdresults %>% filter(st %in% dem ) %>% distinct(st) %>% ungroup %>% summarise(n())
f5b <- makehist(dem, seq(0,40, 5), 40)
ggsave(f5b, filename = "Figure5B.jpg", width = 7, height = 6, device = "jpeg")

### Split States
# 153 Districts, 15 states
cdresults %>% filter(st %in% split ) %>% distinct(st) %>% ungroup %>% summarise(n())
f6a <- makehist(split, seq(0,85, 10), 85)
ggsave(f6a, filename = "Figure6A.jpg", width = 7, height = 6, device = "jpeg")

### VRA States
#80 Districts, 7 states
cdresults %>% filter(st %in% VRA ) %>% distinct(st) %>% ungroup %>% summarise(n())
f6b <- makehist(VRA, seq(0,75, 10), 75)
ggsave(f6b, filename = "Figure6B.jpg", width = 7, height = 6, device = "jpeg")

### Divided states
# 74 Districts, 10 states
cdresults %>% filter(st %in% divided ) %>% distinct(st) %>% ungroup %>% summarise(n())
fa2a <- makehist(divided, seq(0,75, 10), 50)
ggsave(fa2a, filename = "FigureA2A.jpg", width = 7, height = 6, device = "jpeg")

### Bipartisan states
# 79 Districts, 5 states
cdresults %>% filter(st %in% bipartisan ) %>% distinct(st) %>% ungroup %>% summarise(n())
fa2b <- makehist(divided, seq(0,50, 5), 50)
ggsave(fa2b, filename = "FigureA2b.jpg", width = 7, height = 6, device = "jpeg")
