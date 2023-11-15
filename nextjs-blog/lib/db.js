// lib/db.js

import { getDB } from '../db';

const db = getDB();

export async function getUserById(userId) {
  try {
    console.log('Executing query: SELECT * FROM users WHERE id = $1', [userId]);
    const user = await db.one('SELECT * FROM users WHERE id = $1', [userId]);
    console.log('Query executed successfully');
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

// Function to fetch wishlist based on user ID from the database
export async function getWishlistByUserId(userId) {
  try {
    console.log('Executing query: SELECT * FROM wishlist WHERE user_id = $1', [userId]);
    const wishlist = await db.any('SELECT * FROM wishlist WHERE user_id = $1', [userId]);
    console.log('Query executed successfully');
    return wishlist;
  } catch (error) {
    console.error('Error fetching wishlist by user ID:', error);
    throw error;
  }
}

// Function to fetch movies based on movie IDs from the database
export async function getMoviesByUserId(imdbIds) {
  try {
    // Check if the array of imdbIds is not empty before constructing the SQL query
    if (imdbIds.length === 0) {
      return []; // Return an empty array if there are no imdbIds
    }

    const movies = await db.any('SELECT * FROM movies WHERE imdb_id IN ($1:csv)', [imdbIds]);
    return movies;
  } catch (error) {
    console.error('Error fetching movies by IMDb IDs:', error);
    throw error;
  }}


  export async function addToWatchlist(userId, movieId, title, tagline, overview, posterPath) {
    try {
      const query = `
        INSERT INTO wishlist (user_id, movie_id, title, tagline, overview, poster_path)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;
      `;
  
      const result = await db.one(query, [userId, movieId, title, tagline, overview, posterPath]);
      console.log('Added to Watchlist:', title);
      return result;
    } catch (error) {
      console.error('Error adding to Watchlist:', error);
      throw error;
    }
  }
  
