CREATE TABLE IF NOT EXISTS products (
  id serial primary key,
  name varchar(128),
  views integer default 0,
  price numeric(6,2),
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);

CREATE TRIGGER set_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW 
  EXECUTE FUNCTION set_current_timestamp_updated_at();