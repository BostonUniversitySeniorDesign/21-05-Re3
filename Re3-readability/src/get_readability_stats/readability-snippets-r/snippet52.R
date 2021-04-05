theme_bw1 <- function(base_size = 20, base_family = "") {
  
  theme_bw(base_size = base_size, base_family = base_family) %+replace%
    theme(
      axis.text.x =       element_text(size = base_size*.9, colour = "black"),
      axis.text.y =       element_text(size = base_size, colour = "black"), # changes position of X axis text
      
      axis.ticks =        element_line(colour = "grey50"),
      axis.title.y =      element_text(size = base_size,angle=90,vjust=.01,hjust=.1),
      plot.title =             element_text(face = "bold"),
      legend.position = "none"
    )
}