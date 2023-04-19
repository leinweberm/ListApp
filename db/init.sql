-- GRANT ALL PRIVILEGES ON DATABASE pgadmin TO pgadmin;

-- CREATE SCHEMA IF NOT EXISTS mlapp;
-- ALTER SCHEMA mlapp OWNER TO pgadmin;

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE TABLE IF NOT EXISTS mlapp.roles(
-- 	role_uid UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
-- 	name TEXT DEFAULT NULL,
-- 	valid BOOLEAN DEFAULT true
-- );
-- ALTER TABLE mlapp.roles OWNER TO pgadmin;

-- CREATE TABLE IF NOT EXISTS mlapp.users (
-- 	user_uid UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
-- 	role_uid UUID NOT NULL,
-- 	username TEXT NOT NULL,
-- 	password TEXT NOT NULL,
-- 	created TIMESTAMPZ WITH TIME ZONE DEFAULT now(),
-- 	deleted TIMESTAMPZ DEFAULT NULL,
-- 	theme TEXT DEFAULT 'light',
-- 	lang TEXT DEFAULT 'en'
-- );
-- ALTER TABLE mlapp.users OWNER TO pgadmin;
-- ALTER TABLE mlapp.users ADD CONSTRAINT user_role_fkey FOREIGN KEY (role_uid)
--   REFERENCES mlapp.roles(role_uid) ON DELETE SET NULL;

-- CREATE TABLE IF NOT EXISTS mlapp.todos (
-- 	todo_uid UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
-- 	user_uid UUID NOT NULL,
-- 	name TEXT DEFAULT NOT  NULL,
-- 	description TEXT DEFAULT NULL,
-- 	created TIMESTAMPZ WITH TIME ZONE DEFAULT now(),
-- 	updated TIMESTAMPZ DEFAULT NULL,
-- 	deleted TIMESTAMPZ DEFAULT NULL
-- );
-- ALTER TABLE mlapp.todos OWNER TO pgadmin;
-- ALTER TABLE mlapp.todos ADD CONSTRAINT todo_user_fkey FOREIGN KEY (user_uid)
-- 	REFERENCES mlapp.users(user_uid) ON DELETE SET NULL;

\ir sql/privileges/privileges.sql
\ir sql/schemas/mlapp.sql
\ir sql/extensions/extensions.sql
\ir sql/tables/roles.sql
\ir sql/tables/todos.sql
\ir sql/tables/users.sql

-- INSERT INTO mlapp.roles(name)
-- VALUES ('admin'),('user');