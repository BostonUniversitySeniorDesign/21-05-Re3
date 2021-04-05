for (circuit in useCircuits){
    df <- read.csv(file=paste0("final_",circuit,"_df.csv"))
    case_count_by_circuit[circuit] <- nrow(df)
    state_table <- data.frame(Circuit=circuit,
                              State=names(table(df$state)),
                         Petitioners=as.numeric(table(df$state)),
                         Relief.Denials=table(df$state,df$panelvote == "Grant of Relief")[,1],
                         Executions=table(df$state,df$executed)[,2])
    rownames(state_table) <- NULL
    state_table_list[[which(circuit == useCircuits)]] <- state_table
}