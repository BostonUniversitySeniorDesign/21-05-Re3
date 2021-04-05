check_recode_levels <- function(...) {
  levels <- rlang::list2(...)

  is_ok <- function(x) is.character(x) && length(x) == 1
  ok <- vapply(levels, is_ok, logical(1))

  if (!all(ok)) {
    stop(
      "Each input to fct_recode must be a single named string. ",
      "Problems at positions: ", paste0(which(!ok), collapse = ", "),
      call. = FALSE
    )
  }

  unlist(levels)
}