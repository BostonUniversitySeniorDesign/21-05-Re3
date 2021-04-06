set.seed(1234567890)

#*****************************#
#    Table 1: MAIN EFFECTS    #
#*****************************#

#    Column 1 : No controls   #

col1 <- boot(data=personality, statistic=bs, R=20000, formula=Vanhanen00 ~ e + o +  a + n + c)
print(col1)

#    Column 2 :  GDP #
col2 <- boot(data=personality, statistic=bs, R=20000, formula=Vanhanen00 ~ e + o +  a + n + c + log(GDPpc05))
print(col2)

#    Column 3 : GINI  #
col3 <- boot(data=personality, statistic=bs, R=20000, formula=Vanhanen00 ~ e + o +  a + n + c + Gini05)
print(col3)