#' @importFrom tibble is_tibble
#' @export
`[.rowwise_df` <- function(x, i, j, drop = FALSE) {
  out <- NextMethod()

  if (!is.data.frame(out)) {
    return(out)
  }

  group_vars <- intersect(names(out), group_vars(x))
  rowwise_df(out, group_vars)
}