
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS email varchar(100) null;
-- ALTER TABLE users DROP COLUMN IF EXISTS email;

CREATE TABLE IF NOT EXISTS bid
(
    id serial not null unique,
    user_id int references users (id) on delete cascade not null,
    lot_id uuid references lot (id) on delete cascade not null,
    price numeric(15, 2) not null
);
-- DROP TABLE IF EXISTS bid CASCADE;

CREATE TABLE IF NOT EXISTS photo
(
    id serial not null unique,
    lot_id uuid references lot (id) on delete cascade not null,
    src_original varchar(200) not null
);
-- DROP TABLE IF EXISTS photo CASCADE;

CREATE TABLE IF NOT EXISTS shipment
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id int references users (id) on delete cascade not null,
    lot_id uuid references lot (id) on delete cascade not null,
    date timestamp not null default CURRENT_TIMESTAMP,
    price numeric(15, 2) not null,
    constraint id_shipment_tbl primary key ( id )
);
-- DROP TABLE IF EXISTS shipment CASCADE;
