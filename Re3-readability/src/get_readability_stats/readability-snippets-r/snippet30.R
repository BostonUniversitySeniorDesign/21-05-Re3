#' @rdname melt_delim
#' @export
melt_csv <- function(file, locale = default_locale(), na = c("", "NA"),
                     quoted_na = TRUE, quote = "\"", comment = "",
                     trim_ws = TRUE, skip = 0, n_max = Inf,
                     progress = show_progress(),
                     skip_empty_rows = FALSE) {
  tokenizer <- tokenizer_csv(na = na, quoted_na = quoted_na, quote = quote,
    comment = comment, trim_ws = trim_ws, skip_empty_rows = skip_empty_rows)
  melt_delimited(file, tokenizer, locale = locale, skip = skip,
    skip_empty_rows = skip_empty_rows, comment = comment, n_max = n_max,
    progress = progress)
}
