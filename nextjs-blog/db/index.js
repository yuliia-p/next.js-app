import pgp from 'pg-promise';

export function getDB() {
  const pgpInstance = pgp();
  const connectionString = process.env.DATABASE_URL;
  const dbInstance = pgpInstance(connectionString);

  return dbInstance;
}