UPDATE schema_migrations SET dirty = false;

DROP TABLE IF EXISTS users CASCADE;