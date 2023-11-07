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
    <div>
      <a onClick={openModal}>Register</a>
      {showModal && <RegisterForm onClose={closeModal} />}
    </div>
  );
};

export default RegisterButton;
