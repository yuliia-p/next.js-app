// // pages/api/auth/register.js
// import db from '../../../db';

// export default async (req, res) => {
//   if (req.method !== 'POST') {
//     return res.status(405).end(); // Method Not Allowed
//   }

//   const { email, password } = req.body;

//   // Hash the password (use a secure library for production)
//   const hashedPassword = 'hashFunctionHere';

//   try {
//     const result = await db.none(
//       'INSERT INTO users (email, password) VALUES ($1, $2)',
//       [email, hashedPassword]
//     );
//     return res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     return res.status(500).json({ error: 'Registration failed' });
//   }
// };
// pages/api/auth/register.js

import db from '../../../db/index'; // Import the database connection
import bcrypt from 'bcryptjs';
import RegisterForm from '../../components/RegisterForm';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.one(
      'INSERT INTO users (email, password) VALUES($1, $2) RETURNING id',
      [email, hashedPassword]
    );

    const userId = result.id;

    return res.status(201).json({ userId });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
}


export default function Register() {
  return (
    <div>
      <h1>User Registration</h1>
      <RegisterForm />
    </div>
  );
}
