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