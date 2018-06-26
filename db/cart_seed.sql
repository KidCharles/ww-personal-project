create table cart
(
cart_id serial primary key,
user_id int 
references wwusers(user_id),
trips_id int
references trips(trips_id),
gear_id int
references gear(gear_id),
paid boolean not null default false
);