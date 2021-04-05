data$concon <- rowMeans(cbind(data$concon1, data$concon2, data$concon3))
data$socapprov <- rowMeans(cbind(data$socapprov1, data$socapprov2, data$socapprov3))
data$selfesteem <- rowMeans(cbind(data$selfesteem1, data$selfesteem2, data$selfesteem3))

# Conduct principal component analysis (PCA)

# Scale income motive variables for PCA

df <- data.frame(data$needs,
                 data$famsupport,
                                               data$security,
                                               data$anxiety,
                                               data$work,
                                         data$leisure,
                                   data$charity,
                                   data$concon,
                                               data$socapprov,
                                   data$selfesteem)