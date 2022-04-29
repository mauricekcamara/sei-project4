drop table if exists friends;
drop table if exists users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  admin BOOLEAN
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);