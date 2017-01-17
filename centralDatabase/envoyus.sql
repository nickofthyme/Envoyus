-- Create superuser
CREATE USER blend_admin PASSWORD 'jmonlee' SUPERUSER;
-- Create PostgresQL database named envoyus_db
CREATE DATABASE envoyus_db OWNER blend_admin;
-- Connect to envoyus_db as the superuser
\c envoyus_db blend_admin
-- Enable PostGIS (includes raster)
CREATE EXTENSION postgis;
-- Quit from postgres shell
\q
