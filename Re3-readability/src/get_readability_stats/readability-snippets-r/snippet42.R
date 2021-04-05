myplot <- ggplot(c, aes(y=countryt, x=negcoef.rmssd)) +
  geom_density_ridges_gradient(rel_min_height=.05, scale=1.6, color="white", fill="black") +
  scale_fill_gradient(low="red",high="blue") + 
  xlab("The Impact of Negative News on RMSSD \n(Distributions of Individual-Level Coefficients, by Country)") + 
  ylab("") +
  scale_x_continuous(limits=c(-40,40)) +
  scale_y_discrete(limits=c("US","UK","Sweden*","Senegal","Russia","New Zealand","Japan","Italy*","Israel","India",
                            "Ghana","France*","Denmark","China","Chile","Canada*","Brazil*")) +
  theme(
    axis.ticks.y=element_blank(),
    panel.grid.major.x = element_blank(),
    axis.text.y = element_text(color = "black", size = 11, vjust = -.2),  
    axis.text.x = element_text(color = "black", size = 10),  
    panel.background = element_rect(fill = "white",colour = "white",size = 0.5, linetype = "solid"),
    panel.grid.major = element_line(size = 0.25, linetype = 'solid',colour = "gray"), 
    panel.grid.minor = element_line(size = 0.25, linetype = 'solid',colour = "white")
  ) +
  geom_vline(xintercept = 0, color="white") 
