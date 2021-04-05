#####
#####CREATE PRODUCT FRACTIONALIZATION INDEX
#####

data2 <- ddply(lts1_trader, ~associationID, summarise, count_apparel = sum(productaltcat_apparel), count_electronics = sum(productaltcat_electronics), count_beauty = sum(productaltcat_beauty), count_hardware = sum(productaltcat_hardware), count_home = sum(productaltcat_home))

data2$product_total <- data2$count_apparel + data2$count_electronics + data2$count_beauty + data2$count_hardware + data2$count_home

data2$apparel_prop <- data2$count_apparel/data2$product_total
data2$electronics_prop <- data2$count_electronics/data2$product_total
data2$beauty_prop <- data2$count_beauty/data2$product_total
data2$hardware_prop <- data2$count_hardware/data2$product_total
data2$home_prop <- data2$count_home/data2$product_total

data2$prodfrac <- 1 - ((data2$apparel_prop)^2 + (data2$electronics_prop)^2  + (data2$beauty_prop)^2  + (data2$hardware_prop)^2 + (data2$home_prop)^2)

lts1_trader <- merge(lts1_trader, data2, by.x="associationID", by.y="associationID", all=TRUE)