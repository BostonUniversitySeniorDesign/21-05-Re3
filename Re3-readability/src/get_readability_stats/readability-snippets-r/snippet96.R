### Country code is a bit messy
orig$iso3c <- NA
orig$iso3c[which(orig$Prize=="Prix Italia")] <- countrycode(
	orig$Country[which(orig$Prize=="Prix Italia")],
	"country.name","iso3c")
orig$iso3c[which(orig$Prize=="Monte Carlo")] <- countrycode(
	orig$Country[which(orig$Prize=="Monte Carlo")],
	"country.name","iso3c")
orig$iso3c[which(orig$Prize=="Emmies")] <- countrycode(
	orig$Country[which(orig$Prize=="Emmies")],
	"country.name","iso3c")
orig$iso3c[which(orig$Prize=="Montreux")] <- as.character(
	orig$Country[which(orig$Prize=="Montreux")])

orig$iso3c <- factor(orig$iso3c)