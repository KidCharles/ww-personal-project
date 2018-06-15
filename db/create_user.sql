INSERT INTO wwusers
(username, user_photo, auth_id)
VALUES
($1, $2, $3)
RETURNING *;