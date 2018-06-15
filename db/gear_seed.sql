CREATE TABLE gear (
    gear_id SERIAL PRIMARY KEY,
    gear_name VARCHAR(100),
    gear_img TEXT,
    gear_long_desc TEXT,
    gear_short_desc TEXT,
    gear_price INTEGER
)