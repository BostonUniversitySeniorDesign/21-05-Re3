# -----------------
#### Functions proposed by Paine:
# ------------------

## Function for consistency necessity:

paine <- function(x,y) 
{a<-sum(x==1&y==1)
b<-sum(x==1&y==0)
c<-sum(x==0&y==1)
d<-sum(x==0&y==0)
xy<-(a/(a+b))/((a/(a+b))+(c/(c+d)))
nxy<-(c/(c+d))/((c/(c+d))+(a/(a+b)))
xny<-(b/(a+b))/((b/(a+b))+(d/(c+d)))
nxny<-(d/(c+d))/((d/(c+d))+(b/(a+b)))
param<-c(xy,nxy,xny,nxny)
rel<- c("x necessary for y", "~x necessary for y", "x necessary for ~y", "~x necessary for ~y")
nec <- data.frame(rel,param)

return(nec)
}