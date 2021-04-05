# n cols, n rows
as_df <- function(x, col) {
  if (is.null(x)) {
    x
  } else if (is.data.frame(x)) {
    x
  } else if (vec_is(x)) {
    # Preserves vec_size() invariant
    new_data_frame(list(x), names = col)
  } else {
    stop("Input must be list of vectors", call. = FALSE)
  }
}