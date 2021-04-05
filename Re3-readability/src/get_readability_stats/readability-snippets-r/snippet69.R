fortify.map <- function(model, data, ...) {
  df <- new_data_frame(list(
    long = model$x,
    lat = model$y,
    group = cumsum(is.na(model$x) & is.na(model$y)) + 1,
    order = seq_along(model$x)
  ), n = length(model$x))

  names <- do.call("rbind", lapply(strsplit(model$names, "[:,]"), "[", 1:2))
  df$region <- names[df$group, 1]
  df$subregion <- names[df$group, 2]
  df[stats::complete.cases(df$lat, df$long), ]
}