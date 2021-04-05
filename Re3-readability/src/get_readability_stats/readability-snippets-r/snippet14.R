 if(type == "continuous"){
    dist <- summary(variable)
    missingness <- table(is.na(variable))
    plot_df <- melt(variable)
    summary_plot <- ggplot(data = plot_df, aes(x = value)) +
      geom_density(fill = "firebrick4", color = "black") +
    #  theme_bw() +
      xlab("Variable Value") +
      ylab("Density") +
      ggtitle(plot_title)
  }