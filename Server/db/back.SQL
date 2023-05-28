/* this query for create table */

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  username VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  cpassword VARCHAR(20) NOT NULL
);







/* This query for alter table */

ALTER TABLE users
  ALTER COLUMN username SET NOT NULL,
  ADD CONSTRAINT unique_username UNIQUE (username);