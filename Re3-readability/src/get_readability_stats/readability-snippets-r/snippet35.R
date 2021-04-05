# Difference-in-means among matched pairs in which both members respond
fit_3 <- tidy(lm_robust(friendly ~ first_name_latino, data = wnf_always_responders))

# This estimator adapted from Aronow et al. 2017 source code
bounds_estimator <- function(Y, Z, Fail, Weight) {
  f0 <- sum(Weight[Fail == 1 & Z == 0]) / sum(Weight[Z == 0])
  f1 <- sum(Weight[Fail == 1 & Z == 1]) / sum(Weight[Z == 1])

  trim0 <- (f1) / (1 - f0)
  trim1 <- (f0) / (1 - f1)

  dataf <- data.frame(Y, Z, Fail, Weight)
  datafsort <- dataf[order(Y), ]