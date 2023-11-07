// db/index.js
const pgp = require('pg-promise')();

// Load your database URL from environment variables
const databaseUrl = process.env.DATABASE_URL;

const db = pgp(databaseUrl);

module.exports = db;
