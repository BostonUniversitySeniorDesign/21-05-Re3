read_builtin <- function(x, package = NULL) {
  warn_to_error <- function(e) {
    stop(conditionMessage(e), call. = FALSE)
  }
  tryCatch(
    warning = function(e) warn_to_error(e),
    expr = {
      res <- utils::data(list = list(x), package = package, envir = environment(), verbose = FALSE)
      get(res[[1]], envir = environment())
    }
  )
}