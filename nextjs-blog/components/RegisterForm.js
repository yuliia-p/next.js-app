import { useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import { useRouter } from 'next/router'; // Import the useRouter


export default function RegisterForm({ onClose }) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter(); // Get the router

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, first_name, last_name }),
      });

      if (response.ok) {
        // Registration successful, navigate to the profile page
        router.push('/profile'); // Replace '/profile' with the actual path to your profile page
      } else {
        // Handle registration error
        console.error('Registration failed');
      }
    } catch (error) {
      // Handle fetch or other errors
      console.error('Error during registration:', error);
    }
  }

  return (
    <div className={utilStyles.registrationModal}>
      <div className={utilStyles.modalContent}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <label className="registration-label">First Name:
            <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
          </label>
          <label className="registration-label">Last Name:
            <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
          </label>
          <label className="registration-label">Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="registration-label">Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button className="registration-button" type="submit">Register</button>
        </form>
        <button className="registration-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
