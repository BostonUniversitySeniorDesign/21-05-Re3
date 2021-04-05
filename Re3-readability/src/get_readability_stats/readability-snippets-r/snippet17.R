############
# Figure 3a
############

ggplot(cces18_data[is.na(cces18_data$party_strength)==F,]) +
  geom_jitter(aes(x=factor(party_strength, levels=c("1","2","3"), labels=c("Leaners","Not-so-strong","Strong")), y=hum_blatant, color=pid3lean)) +
  scale_color_manual(values=c("darkblue", "darkred")) +
  geom_smooth(method = "loess", size = 1.5, aes(x=party_strength, y=hum_blatant, color=pid3lean)) +
  xlab("Party Strength") + 
  ylab("Blatant Dehumanization") +
  labs(color="Party ID") +
  theme_bw() +
  theme(text = element_text(size=18),panel.border = element_blank(), panel.grid.major = element_blank(), panel.grid.minor = element_blank(), axis.line = element_line(colour = "black"), legend.position="bottom") +
  scale_fill_discrete(guide = guide_legend())+
  ylim(c(-83,100))