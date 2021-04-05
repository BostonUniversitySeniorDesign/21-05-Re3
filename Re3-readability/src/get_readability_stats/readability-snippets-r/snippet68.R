#represent
rep_info <- lm(f11_plazarepresent_numeric  ~ e7_electinfo_numeric, data=lts1_trader)
rep_info$clse <-cluster.vcov(rep_info, lts1_trader$associationID) 
rep_info_cluster <- coeftest(rep_info, rep_info$clse)

rep_sleep <- lm(f11_plazarepresent_numeric  ~ f16_sleep_numeric, data=lts1_trader)
rep_sleep$clse <-cluster.vcov(rep_sleep, lts1_trader$associationID) 
rep_sleep_cluster <- coeftest(rep_sleep, rep_sleep$clse)

#honest accounting
honest_info <- lm(f14_honestaccount_numeric  ~ e7_electinfo_numeric, data=lts1_trader)
honest_info$clse <-cluster.vcov(honest_info, lts1_trader$associationID) 
honest_info_cluster <- coeftest(honest_info, honest_info$clse)

honest_sleep <- lm(f14_honestaccount_numeric  ~ f16_sleep_numeric, data=lts1_trader)
honest_sleep $clse <-cluster.vcov(honest_sleep, lts1_trader$associationID) 
honest_sleep_cluster <- coeftest(honest_sleep, honest_sleep $clse)