// pages/api/auth/register.js
import db from '../../../db';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  // Hash the password (use a secure library for production)
  const hashedPassword = 'hashFunctionHere';

  try {
    const result = await db.none(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Registration failed' });
  }
};
