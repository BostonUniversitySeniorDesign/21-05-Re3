p1<-ggplot(out ,aes(y=lsmean, x=fideszQuad, color = treat)) #this is figure for CPS
dodge <- position_dodge(width=0.5) 
pdf("fig2a.pdf")
p1 + geom_point(aes(shape=treat),size=3, position=dodge) +
	geom_errorbar(aes(ymax = upper.CL, ymin=lower.CL), width=0.2, position=dodge) +
	labs(x=NULL, y="effect of reforms on election legitimacy", 
		title = "Fidesz support & election legitimacy \npre-election" ) +
	scale_y_continuous(limits=c(-1.6,1.1))+
	scale_x_discrete(#breaks = c(0, 1,2,3), 
		labels = c("Non-supporters", "Defectors", "Converts", "Partisans")) +
	theme(panel.background = element_blank())
dev.off()