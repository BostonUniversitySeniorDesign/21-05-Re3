cnd_bullet_cur_group_label <- function() {
  label <- cur_group_label()
  if (label != "") {
    glue("The error occurred in {label}.")
  }
}

cnd_bullet_rowwise_unlist <- function() {
  data <- peek_mask()$full_data()
  if (inherits(data, "rowwise_df")) {
    glue("Did you mean: `{error_name} = list({error_expression})` ?", .envir = peek_call_step())
  }
}