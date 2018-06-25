CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    userCartId SERIAL PRIMARY KEY,
    
    trip_name VARCHAR(100),
    trip_img TEXT,
    trip_long_desc TEXT,
    trip_short_desc TEXT,
    trip_price INTEGER,
    trip_color TEXT
)