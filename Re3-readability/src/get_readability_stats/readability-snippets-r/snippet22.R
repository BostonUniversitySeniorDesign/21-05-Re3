draw_panel = function(data, panel_params, coord, width = NULL, flipped_aes = FALSE) {
    data <- flip_data(data, flipped_aes)
    x <- as.vector(rbind(data$xmin, data$xmax, NA, data$x,    data$x,    NA, data$xmin, data$xmax))
    y <- as.vector(rbind(data$ymax, data$ymax, NA, data$ymax, data$ymin, NA, data$ymin, data$ymin))
    data <- new_data_frame(list(
      x = x,
      y = y,
      colour = rep(data$colour, each = 8),
      alpha = rep(data$alpha, each = 8),
      size = rep(data$size, each = 8),
      linetype = rep(data$linetype, each = 8),
      group = rep(1:(nrow(data)), each = 8),
      row.names = 1:(nrow(data) * 8)
    ))
    data <- flip_data(data, flipped_aes)
    GeomPath$draw_panel(data, panel_params, coord)
}