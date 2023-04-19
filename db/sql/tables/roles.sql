CREATE TABLE IF NOT EXISTS mlapp.roles(
	role_uid UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	name TEXT DEFAULT NULL,
	valid BOOLEAN DEFAULT true
);
ALTER TABLE mlapp.roles OWNER TO pgadmin;