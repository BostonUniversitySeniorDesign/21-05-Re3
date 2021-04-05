write_file <- function(x, file, append = FALSE, path = deprecated()) {
  file <- standardise_path(file, input = FALSE)
  if (!isOpen(file)) {
    on.exit(close(file), add = TRUE)
    if (isTRUE(append)) {
      open(file, "ab")
    } else {
      open(file, "wb")
    }
  }
  if (is.raw(x)) {
    write_file_raw_(x, file)
  } else {
    write_file_(x, file)
  }
  invisible(x)
}