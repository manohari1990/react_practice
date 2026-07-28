create type priority_level as enum('low', 'medium', 'high');
create type status_type as enum('completed', 'in_progress', 'pending');
create table if not exists user_todos (
	todo_id UUID default gen_random_uuid() primary key,
	title text Not null,
	details text not null,
	priority priority_level default 'medium',
	status status_type Not null default 'pending',
	due_date date,
	created_at timestamptz default current_timestamp,
	updated_at timestamptz default current_timestamp
)


-- AS updated_at COLUMN IS NOT REFRESHED WHILE EXISTING ROW IS CHANGED, WRITTEN A TRIGGER METHOD TO HANDLE IT.
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN 
	NEW.updated_at = CURRENT_TIMESTAMP;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ATTACH THE TRIGGER TO THE TABLE SO THAT IT WILL RUN BEFORE EVERY CHANGED RECORD
CREATE TRIGGER update_timestamp
BEFORE UPDATE ON user_todos
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
