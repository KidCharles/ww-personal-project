SELECT * 
FROM cart
LEFT JOIN trips on trips.trips_id = cart.trips_id
LEFT JOIN gear on gear.gear_id = cart.gear_id
WHERE cart.user_id = $1;