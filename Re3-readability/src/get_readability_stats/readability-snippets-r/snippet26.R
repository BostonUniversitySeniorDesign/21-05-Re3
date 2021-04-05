check_factor_list <- function(fs, arg_name = "fs") {
  if (!is.list(fs)) {
    stop("`fs` must be a list", call. = FALSE)
  }

  is_factor <- vapply(fs, is.factor, logical(1))
  if (any(!is_factor)) {
    stop("All elements of `", arg_name, "` must be factors", call. = FALSE)
  }

  fs
}