import Modal from "react-modal";

import "./CustomModal.styles.css";

Modal.setAppElement("#root");

const CustomModal = ({ closeModal, modalIsOpen, children }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="modal"
    >
      <button onClick={closeModal}>fechar</button>
      <div className="content">{children}</div>
    </Modal>
  );
};

export default CustomModal;
