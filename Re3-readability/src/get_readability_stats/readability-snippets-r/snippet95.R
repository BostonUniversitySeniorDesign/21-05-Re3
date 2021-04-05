#' @export
dplyr_row_slice.grouped_df <- function(data, i, ..., preserve = FALSE) {
  out <- vec_slice(as.data.frame(data), i)

  # Index into group_indices, then use that to restore the grouping structure
  groups <- group_data(data)
  new_id <- vec_slice(group_indices(data), i)
  new_grps <- vec_group_loc(new_id)

  rows <- rep(list_of(integer()), length.out = nrow(groups))
  rows[new_grps$key] <- new_grps$loc
  groups$.rows <- rows
  if (!preserve && isTRUE(attr(groups, ".drop"))) {
    groups <- group_data_trim(groups)
  }

  new_grouped_df(out, groups)
}
