delete from trips

where trips_id = $1;

select * from trips