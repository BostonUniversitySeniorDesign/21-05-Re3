# Frazioni: 0.615959095 0.260313578 0.087810848 0.021054706 0.011877001 0.002984773
# CUMULATI: 1.000000000 0.384040905 0.123727327 0.035916479 0.014861773 0.002984772
y <- c(1.0,
       1-0.615959095,
       1-0.615959095-0.260313578,
       1-0.615959095-0.260313578-0.087810848,
       1-0.615959095-0.260313578-0.087810848-0.021054706,
       1-0.615959095-0.260313578-0.087810848-0.021054706-0.011877001)

x <- sapply(x, function(x) round(x/1000))

png(filename=paste(WORKING_DIR, "knowledge.png"), width=900, height = 600)

line=lm(y~x)
plot(x,y, log='xy', xlim=rev(c(100, 60000)), ylim=c(0.001, 2.0), pch=21, bg=4,
     panel.first=grid(col="grey80"), 
     xlab="Population size (thousands)", ylab="")