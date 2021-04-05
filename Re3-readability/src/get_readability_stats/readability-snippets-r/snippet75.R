#' @export
#' @rdname fct_reorder
fct_reorder2 <- function(.f, .x, .y, .fun = last2, ..., .desc = TRUE) {
  f <- check_factor(.f)
  stopifnot(length(f) == length(.x), length(.x) == length(.y))
  ellipsis::check_dots_used()

  summary <- tapply(seq_along(.x), f, function(i) .fun(.x[i], .y[i], ...))
  if (is.list(summary)) {
    stop("`fun` must return a single value per group", call. = FALSE)
  }

  lvls_reorder(.f, order(summary, decreasing = .desc))
}