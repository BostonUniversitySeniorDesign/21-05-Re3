# bind income to the quantiles
lpr_ci_med = cbind(jew_seq, lpr_ci_med)

#plot
plot_pred_LPR_both = ggplot(lpr_ci) + 
  geom_line(aes(x=jew_seq, y = mid, color = 'black')) + 
  geom_ribbon(aes(x=jew_seq, ymin=lower, ymax=upper), fill = 'red', alpha = .25) + 
  xlab('pctJews 1931') + 
  ylab('Predicted pctLPR Vote') + 
  geom_line(data = lpr_ci_med, aes(x=jew_seq, y = mid, group = "X at Observed", color = 'blue')) + 
  geom_ribbon(data = lpr_ci_med, aes(x=jew_seq, ymin=lower, ymax=upper), alpha = .25, fill = 'cyan') + 
  scale_color_discrete(labels = c("X at Observed", "X at Median"))
plot_pred_LPR_both