#Model diagnostics
plot(politics.full)
plot(policy.full)

qqnorm(residuals(politics.full))
qqnorm(residuals(policy.full))

ggplot(data.frame(lev=hatvalues(politics.full),pearson=residuals(politics.full,type="pearson")),
       aes(x=lev,y=pearson)) +
  geom_point() +
  theme_bw()
levId <- which(hatvalues(politics.full) >= .2)
combined[levId,c("PpoliticsNN","Country","Year","Report")]