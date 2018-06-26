CREATE TABLE wwusers (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    user_email VARCHAR(100),
    user_photo text,
    auth_id text,
    is_admin boolean not null default false,
    street1 VARCHAR(100),
    street2 VARCHAR(100),
    city VARCHAR(40),
    state VARCHAR(40),
    zip INTEGER
)