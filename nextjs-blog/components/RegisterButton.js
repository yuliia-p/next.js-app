import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import utilStyles from '../styles/utils.module.css';

const RegisterButton = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className={utilStyles.loadMoreButton}
      onClick={openModal}>Register
      </button>
      {showModal && <RegisterForm onClose={closeModal} />}
    </>
  );
};

export default RegisterButton;
