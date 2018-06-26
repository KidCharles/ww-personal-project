UPDATE cart 
SET paid = true
WHERE cart_id = $1
RETURNING *;