import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import utilStyles from '../styles/utils.module.css';
import { useSession, signOut } from 'next-auth/react';

const AuthenticationButton = () => {
  const { data: session, status } = useSession();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  console.log("session", session)
  console.log("status", status)
  
  console.log("signOut", signOut)
  
  const openModal = (isLogin = false) => {
    setIsLoginVisible(isLogin);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className={utilStyles.buttonHolder}>
      {session ? (
        // If user is authenticated, show Sign Out button
        <button className={utilStyles.loadMoreButton} onClick={handleSignOut}>
          Sign Out
        </button>
      ) : (
        // If user is not authenticated, show Register and Login buttons
        <>
          <button className={utilStyles.loadMoreButton} onClick={() => openModal(false)}>
            Register
          </button>
          <button className={utilStyles.loadMoreButton} onClick={() => openModal(true)}>
            Login
          </button>
        </>
      )}

      {isModalVisible && (isLoginVisible ? <LoginForm onClose={closeModal} /> : <RegisterForm onClose={closeModal} onSwitchToLogin={() => openModal(true)} />)}
    </div>
  );
};

export default AuthenticationButton;
