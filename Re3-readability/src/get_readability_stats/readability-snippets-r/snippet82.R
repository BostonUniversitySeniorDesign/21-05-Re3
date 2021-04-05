names_bindings <- self$current_vars()

osbolete_promise_fn <- function(name) {
abort(c(
    "Obsolete data mask.",
    x = glue("Too late to resolve `{name}` after the end of `dplyr::{fn}()`."),
    i = glue("Did you save an object that uses `{name}` lazily in a column in the `dplyr::{fn}()` expression ?")
))
}

promises <- map(names_bindings, function(.x) expr(osbolete_promise_fn(!!.x)))
env_unbind(private$bindings, names_bindings)
env_bind_lazy(private$bindings, !!!set_names(promises, names_bindings))