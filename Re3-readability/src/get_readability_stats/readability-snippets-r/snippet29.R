interactionDiagonal<- simGG(coxsimInteract(model4diagonal,
                                           b1 = "article46tvc", 
                                           b2 = "v2x_diagacc",
                                           X2 = seq(min(accountabilityModelsData$v2x_diagacc),
                                                    max(accountabilityModelsData$v2x_diagacc), length.out = 100),
                                           expMarg = FALSE),
                            lcolour = "black",
                            pcolour = "grey",
                            xlab = "Diagonal Accountability", 
                            ylab = "Coefficient for\nremedial indications")+
  theme_classic()+
  geom_hline(aes(yintercept = 0), colour = "grey")

interactionDiagonal$data$Lower50 <- interactionDiagonal$data$Min
interactionDiagonal$data$Upper50 <- interactionDiagonal$data$Max