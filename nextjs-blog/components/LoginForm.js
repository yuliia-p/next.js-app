import { useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import { useRouter } from 'next/router';

export default function LoginForm({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('hello userData', userData)
        
        // Redirect to the profile page with the user ID
        router.push(userData.redirectUrl);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={utilStyles.modal}>
      <div className={utilStyles.modalContent}>
        <p>Sign In</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="login-label">
            <input
              className={utilStyles.inputStyle}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </label>
          <label className="login-label">
            <input
              className={utilStyles.inputStyle}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </label>
          
          <button
            style={{ marginBottom: '1rem' }}
            className={utilStyles.loadMoreButton}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <button className={utilStyles.loadMoreButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
