dat.sub <- dat[dat$STATE == state,]

##number of counties
m <- nrow(dat.sub)

##Confirms the covariates are ordered sequentially by county number
X <- X[X$STATE == state, ]
X <- X[order(X$COUNTYNUMB, decreasing = FALSE),]
X <- as.matrix(X[,c("POPDEN2010", "Forest.ha")], nrow = m)
##Design Matrix
X <- cbind(1, X)

y <- as.matrix(dat.sub$Y.i, nrow = m)
logy <- log(y)
tilde.sigma.sq <- as.numeric(dat.sub$sigma.sq.i / y^2)
