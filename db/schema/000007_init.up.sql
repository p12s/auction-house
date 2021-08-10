
ALTER TABLE lot
DROP CONSTRAINT lot_status_id_fkey;
-- ALTER TABLE lot ADD CONSTRAINT lot_status_id_fkey
-- FOREIGN KEY (status_id) REFERENCES lot_status (id);

DROP TABLE IF EXISTS lot_status CASCADE;
-- CREATE TABLE IF NOT EXISTS lot_status
-- (
--     id serial not null unique,
--     name varchar(30) not null
-- );
