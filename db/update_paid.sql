SELECT * FROM cart
WHERE user_id = $1
UPDATE cart 
SET paid = true
RETURNING *;