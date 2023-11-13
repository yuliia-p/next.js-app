// pages/api/auth/register.js

import { getDB } from '../../../db/index';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password, first_name, last_name } = req.body;

  // Validate incoming data
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const dbInstance = getDB(); // Create a new instance of the database connection

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await dbInstance.one(
      'INSERT INTO users (email, password, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING id',
      [email, hashedPassword, first_name, last_name]
    );
    console.log('User registered successfully:', result);

    const userId = result.id;

    return res.status(201).json({ userId });
  } catch (error) {
    console.error('Error during registration:', error.message || error);

    // Check for duplicate key violation
    if (error.code === '23505') {
      console.error('Duplicate key violation. Email address already registered.');
      return res.status(409).json({ error: 'Email address already registered' });
    }
    console.error('Unknown error during registration:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
}
