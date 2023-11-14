-- Users table
CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Movies table
CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    imdb_id VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255),
    tagline VARCHAR(255),
    overview TEXT,
    poster_path VARCHAR(255),
    genres VARCHAR(255)[]
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    movie_id VARCHAR(255) REFERENCES movies(imdb_id)
);