DELETE FROM cart
WHERE user_id = $1
returning*;