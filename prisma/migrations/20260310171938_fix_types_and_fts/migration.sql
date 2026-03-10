CREATE INDEX product_name_fts_idx ON "products" USING GIN (to_tsvector('portuguese', "name"));
