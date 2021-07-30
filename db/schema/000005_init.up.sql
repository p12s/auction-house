CREATE TABLE IF NOT EXISTS category
(
    id serial not null unique,
    title varchar(50) not null,
    parent_category_id int references category (id) on delete set null
);
-- DROP TABLE IF EXISTS lot CASCADE;

ALTER TABLE lot 
ADD COLUMN IF NOT EXISTS category_id int references category (id) on delete cascade null;
-- ALTER TABLE lot DROP COLUMN IF EXISTS category_id;
