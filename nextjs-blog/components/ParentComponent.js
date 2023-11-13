// ParentComponent.js
import { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default function ParentComponent() {
  const [showLogin, setShowLogin] = useState(false);

  const onSwitchToLogin = () => {
    setShowLogin(true);
  };

  const onSwitchToRegister = () => {
    setShowLogin(false);
  };

  return (
    <div>
      {showLogin ? (
        <LoginForm onSwitchToRegister={onSwitchToRegister} />
      ) : (
        <RegisterForm onSwitchToLogin={onSwitchToLogin} />
      )}
    </div>
  );
}
