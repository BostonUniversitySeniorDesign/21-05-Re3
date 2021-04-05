print.dplyr_sel_vars <- function(x, ...) {
  cat("<dplyr:::vars>\n")
  print(unstructure(x))

  groups <- attr(x, "groups")
  if (length(groups)) {
    cat("Groups:\n")
    print(groups)
  }

  invisible(x)
}