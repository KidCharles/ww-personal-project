CREATE TABLE wwusers (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(100),
    user_email VARCHAR(100),
    user_photo text
)