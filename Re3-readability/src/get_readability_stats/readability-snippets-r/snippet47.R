## Replication of models

hm$size.government <- hm$size * hm$government
hm$government.early <- hm$government * hm$early

# write.csv(hm, 'hix_march_2007.csv', na='', row.names = FALSE)

lm_robust <- function(lm_formula, lm_data = NA, hc_type = "HC0") {
  model <- lm(lm_formula, data = lm_data)
  print(sprintf('n = %d --  adj. R2 = %.2f', nobs(model), summary(model)$adj.r.squared))
  coeftest(model, vcov = vcovHC(model, type = hc_type))  # HC0, sandwich; HC1 Stata 'robust'
}