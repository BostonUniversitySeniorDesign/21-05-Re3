ggplot(df, aes(x = level, y = pred, ymin = lwr, ymax = upr,
                                                         shape = type, group = type, colour = type, linetype = type)) +
  facet_grid(.~sex) +
        geom_errorbar(width=.1, size=1, position=dodge, linetype="solid") +
  geom_point(size=5, position=dodge, aes(colour = type)) +
  geom_line(aes(group=type), position=dodge) +
        theme_bw() +
  scale_colour_manual(values=c("grey35", "grey65"))  +
  scale_linetype_manual(values=c("solid", "dashed"))  +
  ylab("Economic Conservatism") +
        xlab("Level") +
  scale_y_continuous(limits=c(.45, .75),
                     breaks = seq(0,1,.05)) +
  theme(text = element_text(size=25),
        axis.text.x=element_text(size=25)) +
        guides(shape = guide_legend(reverse=F, title="Motive"),
                                 colour = guide_legend(reverse=F, title="Motive"),
                                 linetype = guide_legend(reverse=F, title="Motive"))