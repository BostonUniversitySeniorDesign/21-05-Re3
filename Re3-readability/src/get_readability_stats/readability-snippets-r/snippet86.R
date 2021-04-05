stream_delim_ <- function(df, connection, delim, na, col_names, bom, quote_escape, eol) {
  .Call("_readr_stream_delim_", df, connection, delim, na, col_names, bom, quote_escape, eol, PACKAGE = "readr")
}

write_lines_ <- function(lines, connection, na, sep) {
  invisible(.Call("_readr_write_lines_", lines, connection, na, sep, PACKAGE = "readr"))
}

write_lines_raw_ <- function(x, connection, sep) {
  invisible(.Call("_readr_write_lines_raw_", x, connection, sep, PACKAGE = "readr"))
}

write_file_ <- function(x, connection) {
  invisible(.Call("_readr_write_file_", x, connection, PACKAGE = "readr"))
}
