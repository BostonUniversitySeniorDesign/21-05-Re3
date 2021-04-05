full_turn <- ggplot(tgc1, aes(x=Year, y=Turnout,
                             colour=Violence, group=Violence)) + 
  geom_errorbar(aes(ymin=Turnout-se, ymax=Turnout+se), width=.1, position=pd) +
  geom_line(position=pd, size = 1) +
  geom_point(position=pd, size=3, shape=19) +
  xlab("Year") +
  ylab("Turnout") +
  theme_bw() +
  scale_color_manual(labels = c("No", "Yes"), values = c("blue", "red")) +
  labs(color='State Violence') + #Set legend title
  theme(legend.justification=c(1,0),
        legend.position=c(0.995,0.01),
        axis.text=element_text(size=18),
        axis.title=element_text(size=22,face="bold"),
        legend.text=element_text(size=14))