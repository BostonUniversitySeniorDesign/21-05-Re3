# use version from ParlGov archive -- www.parlgov.org
pg_db <- src_sqlite('parlgov-stable-2014.db')

# get commissioner data
com <- tbl(pg_db, 'external_commissioner_doering') %>% collect

# get documentation of variables
tbl(pg_db, 'info_table') %>% filter(name=='external_commissioner_doering')
doc_var <- tbl(pg_db, 'info_variable') %>%
  filter(table_id == 20) %>%
  collect %>%
  arrange(column_number)

# use documentation to order commissioner variables 
com <- com[ , doc_var$name]