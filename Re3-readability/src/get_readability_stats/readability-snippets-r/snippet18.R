###############################################################################
################# Figure A6: Distribution of 20-km Averages  ##################
###############################################################################

##### ANALYSIS FOR HOUSES AND ROOFS
m2<-read.csv("distMatTreblinkaMGm1990s.csv") ##Load matrix of distances between all gminas
head(m2) #
rownames(m2)<-m2[,1]
m2<-m2[,-1] #Remove first column (bc now this info is in rownames)
dim(m2) #139 139
#Get list of communities within 20-km radius for each community
Hbelow20km<-apply(m2, 2, function(x) rownames(m2)[which(x<20000)]) 
Hbelow20km <-Hbelow20km[-which(lengths(Hbelow20km)<6)] ##Cut off groups with low N bc they are on the edge of the radius (min. six units)
