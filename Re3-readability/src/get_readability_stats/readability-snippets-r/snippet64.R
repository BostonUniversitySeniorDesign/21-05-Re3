# These stay constant over the simulations
y1m_c <- 0.50 # mean(Y[R1==1 & Z==0])
y1m_t <- 0.50 # mean(Y[R1==1 & Z==1])
y2m_nm_c <- 0.50 # mean(Y[R2==1 & Z==0])
y2m_nm_t <- 0.50 # mean(Y[R2==1 & Z==1])

s1_c <- .5 # sd(Y[R1==1 & Z==0])
s1_t <- .5 # sd(Y[R1==1 & Z==1])
s2_nm_c <- .5 # sd(Y[R2==1 & Z==0])
s2_nm_t <- .5 # sd(Y[R2==1 & Z==1])

# These vary
n1s_vec <- c(400, 40000)
n2s_vec <- c(50, 5000)
p1_vector <- c(0.25, 0.50, 0.75)
p2_vector <- seq(0, 1, length.out = 1000)
res_mat <- NULL
