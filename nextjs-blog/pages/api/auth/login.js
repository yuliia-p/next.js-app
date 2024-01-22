import { getDB } from '../../../db/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  // Validate incoming data
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const database = getDB(); // Create a new instance of the database connection

  try {
    // Retrieve user from the database based on the email
    const user = await database.oneOrNone('SELECT * FROM users WHERE email = $1', email);

    console.log('Retrieved user:', user);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    // Login successful, return the user ID (you might return additional user data)
    const redirectUrl = `/profile/${user.id}`;
    
    return res.status(200).json({ token, userId: user.id, redirectUrl });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
}
