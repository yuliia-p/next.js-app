// Import pg-promise
const pgp = require('pg-promise')();

// Define the database connection configuration
const db = pgp({
  host: 'localhost',      // Your PostgreSQL host
  port: 5432,             // Your PostgreSQL port
  user: 'postgres',   // Your PostgreSQL username
  password: 'junegloom', // Your PostgreSQL password
  database: 'mymovies' // Name of your PostgreSQL database
});

// Export the connected database instance
module.exports = db;
