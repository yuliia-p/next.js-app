import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import utilStyles from '../styles/utils.module.css';

const RegisterButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const openModal = (isLogin = false) => {
    setShowLogin(isLogin);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={utilStyles.buttonHolder}>
      <button className={utilStyles.loadMoreButton} onClick={() => openModal(false)}>
        Register
      </button>
      <button className={utilStyles.loadMoreButton} onClick={() => openModal(true)}>
        Login
      </button>
      {showModal && (showLogin ? <LoginForm onClose={closeModal} /> : <RegisterForm onClose={closeModal} onSwitchToLogin={() => openModal(true)} />)}
    </div>
  );
};

export default RegisterButton;
