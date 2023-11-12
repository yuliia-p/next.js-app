const pgp = require('pg-promise')();

const db = pgp(process.env.DATABASE_URL);

db.connect()
  .then(obj => {
    obj.done(); // success, release the connection
    console.log('Connected to the database');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });

export default db;