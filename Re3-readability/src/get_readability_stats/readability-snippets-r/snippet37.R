#scholars consent
			#modal response 
			table(scholar.consent$IFEAgree)
			mode <- function(x) {
			  ux <- unique(x)
			  ux[which.max(tabulate(match(x, ux)))]
			}
			mode(scholar.consent$IFEAgree)
			#acceptable range, 5-7 
			round(sum(scholar.consent$IFEAgree==5|scholar.consent$IFEAgree==6|scholar.consent$IFEAgree==7)/length(scholar.consent$IFEAgree),2)
			
			#most common response 
			table(scholar.noconsent$IFEAgree)
			#neither agree nor disagree response 
			round(sum(scholar.noconsent$IFEAgree==4)/length(scholar.consent$IFEAgree),2)