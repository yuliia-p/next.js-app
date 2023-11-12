// // db/index.js
// const pgp = require('pg-promise')();

// // Load your database URL from environment variables
// const databaseUrl = process.env.DATABASE_URL;

// const db = pgp(databaseUrl);

// export default db;
const pgp = require('pg-promise')();

// Define the database connection configuration
const db = pgp({
  host: 'localhost',
  port: 5432,
  user: 'yuliiapchelintseva',
  password: 'junegloom',
  database: 'mymovies'
});

db.connect()
  .then(obj => {
    obj.done(); // success, release the connection
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });

export default db;
