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
    <div className={utilStyles.modal}>
      <div className={utilStyles.modalContent}>
        <p>Join Us!</p>
        <form onSubmit={handleRegister}>
          <label className="registration-label">
            <input className={utilStyles.inputStyle} type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} required placeholder='First Name'/>
          </label>
          <label className="registration-label">
            <input className={utilStyles.inputStyle} type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} required placeholder='Last Name'/>
          </label>
          <label className="registration-label">
            <input className={utilStyles.inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email'/>
          </label>
          <label className="registration-label">
            <input className={utilStyles.inputStyle} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password'/>
          </label>
          <button style={{marginBottom: '1rem'}} className={utilStyles.loadMoreButton} type="submit">Register</button>
        </form>
        <button className={utilStyles.loadMoreButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
/*
Got an account? Sign in!
*/