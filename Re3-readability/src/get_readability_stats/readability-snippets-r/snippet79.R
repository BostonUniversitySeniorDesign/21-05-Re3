# Insert uncalibrated data set (Supplemental online material S1 shows where this dataset comes from) as follows

datfuzzy <- data.frame(
  Vinitial = c(0.25,0.73,0.80,0.70,0.10,0.10,0.10,0.10,0.50,0.40,0.10,0.53,0.41),
  Iinitial = c(0.39,0.65,0.58,0.36,0.17,0.31,0.41,0.75,0.35,0.24,0.45,0.26,0.65),
  H = c(0,0,1,1,0,0,0,0,0,0,0,0,0),
  T = c(1,1,0,0,0,0,0,0,1,0,0,0,0),
  S = c(1,1,1,1,0,0,0,0,0,0,0,0,0))

rownames(datfuzzy) <- c("TU","EG","LI","SY","LE","JO","MO","AL","YE","OM","KU","BA","SA")

# Alternatively, use the read command to enter the datfuzzy csv file

# Calibrate the Iinitial and Vinitial conditions # See Annex 1 for the calibrated datamatrix

datfuzzy$V <- calibrate(datfuzzy$Vinitial, type = "fuzzy", thresholds=c(0.15, 0.35, 0.75), logistic = TRUE)
datfuzzy$I <- calibrate(datfuzzy$Iinitial, type = "fuzzy", thresholds=c(0.25, 0.50, 0.60), logistic = TRUE)
datfuzzy