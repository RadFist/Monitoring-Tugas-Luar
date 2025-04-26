import "../style/modal.css";
const formModal = ({ children, displayModal, onSubmit, onClose }) => {
  return (
    <div className={`form-modal ${displayModal}`}>
      <div className="form-modal-cont">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={onSubmit}>{children}</form>
      </div>
    </div>
  );
};

export default formModal;
