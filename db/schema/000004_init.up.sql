SET timezone = 'Europe/Moscow';
-- SHOW TIMEZONE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS lot_status
(
    id serial not null unique,
    name varchar(30) not null
);

CREATE TABLE IF NOT EXISTS lot
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(), 
    title varchar(255) not null,
    description varchar(1500) null,
    date_lot_create timestamp not null default CURRENT_TIMESTAMP,
    date_lot_update timestamp null,
    date_selling_start timestamp null,
    date_selling_finish timestamp null,
    date_selling_actual_finish timestamp null,
    price_min numeric(15, 2),
    price_start numeric(15, 2),
    price_raising_up_step numeric(15, 2),
    price_raising_down_step numeric(15, 2),
    price_finish_selling numeric(15, 2),
    status_id int references lot_status (id) on delete cascade not null,
    comment varchar(1000) null,
    constraint id_tbl primary key ( id )
);
