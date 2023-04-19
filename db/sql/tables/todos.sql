CREATE TABLE IF NOT EXISTS mlapp.todos (
	todo_uid UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	user_uid UUID NOT NULL,
	name TEXT DEFAULT NOT  NULL,
	description TEXT DEFAULT NULL,
	created TIMESTAMPZ WITH TIME ZONE DEFAULT now(),
	updated TIMESTAMPZ DEFAULT NULL,
	deleted TIMESTAMPZ DEFAULT NULL
);
ALTER TABLE mlapp.todos OWNER TO pgadmin;