tryCatch(
    matches <- vec_match(x_key, y_split$key, na_equal = na_equal),
    vctrs_error_incompatible_type = function(cnd) {
      rx <- "^[^$]+[$]"
      x_name <- sub(rx, "", cnd$x_arg)
      y_name <- sub(rx, "", cnd$y_arg)

      abort(c(
        glue("Can't join on `x${x_name}` x `y${y_name}` because of incompatible types."),
        i = glue("`x${x_name}` is of type <{x_type}>>.", x_type = vec_ptype_full(cnd$x)),
        i = glue("`y${y_name}` is of type <{y_type}>>.", y_type = vec_ptype_full(cnd$y))
      ))
    }
  )
