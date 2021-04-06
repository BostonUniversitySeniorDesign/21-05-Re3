common_by.NULL <- function(by, x, y) {
  by <- intersect(tbl_vars(x), tbl_vars(y))
  by <- by[!is.na(by)]
  if (length(by) == 0) {
    bad_args("by", "required, because the data sources have no common variables.")
  }
  inform(auto_by_msg(by))

  list(
    x = by,
    y = by
  )
}