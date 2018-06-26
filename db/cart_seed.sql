create table cart
(
cart_id serial primary key,
quant int,
user_id int 
references wwusers(user_id),
trips_id int
references trips(trips_id),
gear_id int
references gear(gear_id)
);