	###
	# Figure 1
	###
	# Approval ratings by treatment group
	#pdf("PercSupport_12_ByTreatment_BetaEsts.pdf")
	lineplot.CI(x.factor = betas$treatmentname, response = betas$V2, type="p", ylab="",xlab="",axes=F, font=2,
			data = betas, main = "", #xlab = "Treatment Group", ylab = "% Supporting Regulation (12)",
			ylim=c(0.35,0.65),
			ci.fun = function(x) quantile(x, probs=c(0.05, 0.95)) )
		mtext("Percent Supporting Regulation", side=3,cex=1.15, font=2, line=2.5)
		axis(2, las=2)
		mtext("Treatment Group", side=1,cex=1.15, font=1, line=2.5)
	#dev.off()