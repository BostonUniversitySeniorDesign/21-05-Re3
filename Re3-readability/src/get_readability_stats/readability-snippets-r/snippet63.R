#' @export
print.purrr_rate_backoff <- function(x, ...) {
  cat_line(bold("<rate: backoff>"))
  print_purrr_rate(x)

  cat_line(
    bullet("`pause_base`: %d", x$pause_base),
    bullet("`pause_cap`: %d", x$pause_cap),
    bullet("`pause_min`: %d", x$pause_min)
  )

  invisible(x)
}