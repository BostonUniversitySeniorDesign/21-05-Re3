forms <- strsplit(as.character(mod1$call)[2], split="~", fixed=T)
forms <- unlist(lapply(forms, function(x)paste("~", x, sep="")))
count.form <- as.formula(forms[2])

pred.dat <- data.frame(
  lameduck = c(0,0,0,0,0,1,1,1,1,1), 
  hawkish = c(-1,0,1,2,3,-1,0,1,2,3),
  lameduck_hawkish = c(0,0,0,0,0,-1,0,1,2,3),
  rivalry = c(0,0,0,0,0,0,0,0,0,0),
  numbord = c(2,2,2,2,2,2,2,2,2,2),
  parliament = c(0,0,0,0,0,0,0,0,0,0),
  gender = c(0,0,0,0,0,0,0,0,0,0),
  peace = c(5,5,5,5,5,5,5,5,5,5),
  peace2 = c(25,25,25,25,25,25,25,25,25,25),
  peace3 = c(125,125,125,125,125,125,125,125,125,125)
)