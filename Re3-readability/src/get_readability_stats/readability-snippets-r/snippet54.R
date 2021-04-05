top_n <- function(x, n, wt) {
  lifecycle::signal_superseded("1.0.0", "top_n()", "slice_max()")
  wt <- enquo(wt)
  if (quo_is_missing(wt)) {
    vars <- tbl_vars(x)
    wt_name <- vars[length(vars)]
    inform(glue("Selecting by ", wt_name))
    wt <- sym(wt_name)
  }

  filter(x, top_n_rank({{ n }}, !!wt))
}