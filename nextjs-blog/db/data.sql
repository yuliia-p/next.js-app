-- data.sql
DELETE FROM users WHERE email = 'user1@example.com' OR email = 'user2@example.com';

INSERT INTO users (first_name, last_name, email, password) VALUES ('First1', 'Last1', 'user1@example.com', 'hashed_password_1');
INSERT INTO users (first_name, last_name, email, password) VALUES ('First2', 'Last2', 'user2@example.com', 'hashed_password_2');
-- Add more rows as needed
