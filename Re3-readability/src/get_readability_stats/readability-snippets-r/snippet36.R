strip_stage <- function(expr) {
  uq_expr <- get_expr(expr)
  if (is_call(uq_expr, c("after_stat", "after_scale"))) {
    uq_expr[[2]]
  } else if (is_call(uq_expr, "stage")) {
    # Prefer stat mapping if present, otherwise original mapping (fallback to
    # scale mapping) but there should always be two arguments to stage()
    uq_expr$after_stat %||% uq_expr$start %||% (if (is.null(uq_expr$after_scale)) uq_expr[[3]]) %||% uq_expr[[2]]
  } else {
    expr
  }
}