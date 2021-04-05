#' @export
#' @rdname bind
bind_rows <- function(..., .id = NULL) {
  dots <- list2(...)

  # bind_rows() has weird legacy squashing behaviour
  is_flattenable <- function(x) vec_is_list(x) && !is_named(x)
  if (length(dots) == 1 && is_bare_list(dots[[1]])) {
    dots <- dots[[1]]
  }
  dots <- flatten_if(dots, is_flattenable)
  dots <- discard(dots, is.null)

  if (is_named(dots) && !all(map_lgl(dots, dataframe_ish))) {
    # This is hit by map_dfr() so we can't easily deprecate
    return(as_tibble(dots))
  }