between <- function(x, left, right, bounds = "[]") {
  bounds <- switch(bounds,
    "[]" = list(`>=`, `<=`),
    "[)" = list(`>=`, `<`),
    "(]" = list(`>`, `<=`),
    "()" = list(`>`, `<`),
    abort("Unknown `bounds` specfiication.")
  )

  bounds[[1]](vec_compare(x, left), 0) &
    bounds[[2]](vec_compare(x, right), 0)
}