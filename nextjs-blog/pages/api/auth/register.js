

import db from '../../../db/index' // Import the database connection
import bcrypt from 'bcryptjs';
import RegisterForm from '../../../components/RegisterForm';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password, first_name, last_name } = req.body;

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.one(
      'INSERT INTO users (email, password, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING id',
      [email, hashedPassword, first_name, last_name]
    );

    const userId = result.id;

    return res.status(201).json({ userId });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
}


export function Register() {
  return (
    <div>
      <h1>User Registration</h1>
      <RegisterForm />
    </div>
  );
}
