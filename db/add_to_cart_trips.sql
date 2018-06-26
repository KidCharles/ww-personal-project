insert into cart (user_id, trips_id, gear_id, paid)
values ($1, $2, null, false)
RETURNING *;