validate_rectangular_shape <- function(frame_names, frame_rest) {
  if (length(frame_names) == 0 && length(frame_rest) == 0) return()

  # Figure out the associated number of rows and number of columns,
  # and validate that the supplied formula produces a rectangular
  # structure.
  if (length(frame_rest) %% length(frame_names) != 0) {
    cnd_signal(error_tribble_non_rectangular(
      length(frame_names),
      length(frame_rest)
    ))
  }
}
