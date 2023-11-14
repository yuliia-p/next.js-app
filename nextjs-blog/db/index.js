import pgPromise from 'pg-promise';

export function getDB() {
  const pgp = pgPromise();
  const connectionString = process.env.DATABASE_URL;
  const db = pgp(connectionString);

  return db;
}
