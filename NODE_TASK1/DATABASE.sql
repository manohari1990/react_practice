-- AS updated_at COLUMN IS NOT REFRESHED WHILE EXISTING ROW IS CHANGED, WRITTEN A TRIGGER METHOD TO HANDLE IT.
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN 
	IF NEW IS DISTINCT FROM OLD THEN
		NEW.updated_at = CURRENT_TIMESTAMP;
	END IF;
	RETURN NEW;
	
END;
$$ LANGUAGE plpgsql;
----------------------------------------------------------------------------------------------------------------------------

-- USER TODOS TABLE DEFINITION
CREATE TYPE priority_level AS enum('low', 'medium', 'high');
CREATE TYPE status_type AS enum('completed', 'in_progress', 'pending');

CREATE TABLE IF NOT EXISTS user_todos (
	todo_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	title TEXT NOT NULL,
	details TEXT NOT NULL,
	priority priority_level DEFAULT 'medium',
	status status_type NOT NULL DEFAULT 'pending',
	due_date DATE,
	created_at TIMESTAMPTZ DEFAULT current_timestamp,
	updated_at TIMESTAMPTZ DEFAULT current_timestamp
);

ALTER TABLE user_todos 
ADD COLUMN user_id UUID,
ADD CONSTRAINT fk_todos_user
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE;

-- ATTACH THE TRIGGER TO THE "TODOS" TABLE SO THAT IT WILL RUN BEFORE EVERY CHANGED RECORD
CREATE TRIGGER update_timestamp
BEFORE UPDATE ON user_todos
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

----------------------------------------------------------------------------------------------------------------------------

-- USERS TABLE DEFINITION
CREATE TYPE user_statuses AS enum('active', 'inactive', 'pending_activation', 'suspended', 'temp_inactive');

CREATE TABLE IF NOT EXISTS users(
	user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	username VARCHAR(255) UNIQUE KEY,
	email VARCHAR(255) UNIQUE KEY,
	phone VARCHAR(20),
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255),
	password TEXT NOT NULL,
	user_status user_statuses NOT NULL DEFAULT 'active',
	created_at TIMESTAMPTZ DEFAULT current_timestamp,
	updated_at TIMESTAMPTZ DEFAULT current_timestamp
); 


CREATE TRIGGER update_user_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

