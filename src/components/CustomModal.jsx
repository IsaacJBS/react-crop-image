import { useState } from "react";

import Modal from "react-modal";

import "./styles.css";

Modal.setAppElement("#root");

const CustomModal = ({ closeModal, modalIsOpen, children }) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
      >
        <button onClick={closeModal}>close</button>
        <div className="content">{children}</div>
      </Modal>
    </div>
  );
};

export default CustomModal;
