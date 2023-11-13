import pgPromise from 'pg-promise';

let dbInstance;

export function getDB() {
  if (!dbInstance) {
    const pgp = pgPromise();
    const connectionString = process.env.DATABASE_URL; // Use your environment variable here

    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not defined');
    }

    dbInstance = pgp(connectionString);
  }

  return dbInstance;
}
