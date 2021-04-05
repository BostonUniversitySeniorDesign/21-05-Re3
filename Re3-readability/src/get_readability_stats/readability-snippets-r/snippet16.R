cols <- enquo(cols)
spec <- build_longer_spec(data, !!cols,
names_to = names_to,
values_to = values_to,
names_prefix = names_prefix,
names_sep = names_sep,
names_pattern = names_pattern,
names_ptypes = names_ptypes,
names_transform = names_transform
)

pivot_longer_spec(data, spec,
names_repair = names_repair,
values_drop_na = values_drop_na,
values_ptypes = values_ptypes,
values_transform = values_transform
)