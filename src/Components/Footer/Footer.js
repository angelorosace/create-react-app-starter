import React, { useState } from 'react';
import './Footer.css'; // Import your CSS file here
import '@fortawesome/fontawesome-free/css/all.css';
import AnimalCreationForm from '../EntryCreationForm/AnimalCreationForm';
import Modal from '../Modal/Modal';

function Footer() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

    return (
        <div className="footer">
          <div className="footer-buttons">
            <button className="footer-button right" onClick={openModal}>
                <i className="fas fa-plus"></i>
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <AnimalCreationForm onClose={closeModal} />
            </Modal>
          </div>
        </div>
      );
}

export default Footer;