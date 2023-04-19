ALTER TABLE mlapp.users ADD CONSTRAINT user_role_fkey FOREIGN KEY (role_uid)
	REFERENCES mlapp.roles(role_uid) ON DELETE SET NULL;
ALTER TABLE mlapp.todos ADD CONSTRAINT todo_user_fkey FOREIGN KEY (user_uid)
	REFERENCES mlapp.users(user_uid) ON DELETE SET NULL;