import { useState } from "react";

import Modal from "react-modal";

Modal.setAppElement("#root");

const CustomModal = ({ closeModal, modalIsOpen, children }) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        {children}
      </Modal>
    </div>
  );
};

export default CustomModal;
