if(missing(cluster)) b.ind <- matrix(NA, nrow = nrow(fit$x), ncol = B)
else b.ind <- list()
coxcph <- inherits(fit, "coxph") || inherits(fit, "cph") || 
    (length(fit$fitFunction) && any(c("cph", "coxph") %in% 
        fit$fitFunction))
nfit <- fit$fitFunction[1]
if (!length(nfit)) 
    nfit <- setdiff(oldClass(fit), "Design")[1]
if (length(fit$weights) && (coxcph || nfit[1] == "Rq")) 
    stop("does not handle weights")
if (!length(X <- fit$x) | !length(Y <- fit$y)) 
    stop("you did not specify x=TRUE and y=TRUE in the fit")