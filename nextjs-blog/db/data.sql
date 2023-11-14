INSERT INTO users (first_name, last_name, email, password)
VALUES
  ('John', 'Doe', 'john.doe@example.com', 'hashed_password_1'),
  ('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password_2');

INSERT INTO movies (imdb_id, title, tagline, overview, poster_path, genres)
VALUES
  ('tt1234567', 'Movie 1', 'Tagline for Movie 1', 'Overview for Movie 1', '/path/to/poster1.jpg', ARRAY['Action', 'Drama']),
  ('tt9876543', 'Movie 2', 'Tagline for Movie 2', 'Overview for Movie 2', '/path/to/poster2.jpg', ARRAY['Comedy', 'Romance']);

INSERT INTO wishlist (user_id, movie_id)
VALUES
  (1, 'tt1234567'),
  (2, 'tt9876543');
