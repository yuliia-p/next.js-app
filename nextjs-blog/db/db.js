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

db.connect()
  .then(obj => {
    obj.done(); // success, release the connection
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });

module.exports = db;
