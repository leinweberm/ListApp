CREATE TABLE IF NOT EXISTS mlapp.users (
	user_uid UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	role_uid UUID NOT NULL,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	created TIMESTAMPZ WITH TIME ZONE DEFAULT now(),
	deleted TIMESTAMPZ DEFAULT NULL,
	theme TEXT DEFAULT 'light',
	lang TEXT DEFAULT 'en'
);
ALTER TABLE mlapp.users OWNER TO pgadmin;