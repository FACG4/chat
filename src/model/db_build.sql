BEGIN;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS chats CASCADE;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR NOT NULL
);
CREATE TABLE messages(
id SERIAL PRIMARY KEY,
user_id INTEGER,
content TEXT NOT NULL ,
date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE chats(
id SERIAL PRIMARY KEY,
sender_id INTEGER REFERENCES USERS,
reciever_id INTEGER REFERENCES USERS,
content TEXT NOT NULL,
 date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password)VALUES
('Abdallah', 'abdalla@gmail.com', '123'),
('Israa', 'israamm94@gmail.com', '123');

INSERT INTO messages (user_id, content, date) VALUES
(1,'hello', now()),
(2,'heeey', now());

INSERT INTO chats (sender_id, reciever_id, content, date) VALUES
(1,2,'hello', now()),
(2,1,'heeey', now());

COMMIT;
