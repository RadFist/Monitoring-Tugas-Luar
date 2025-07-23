import "../style/modal.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

const FormModal = ({ children, displayModal, onSubmit, onClose }) => {
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

export const SuccessModal = ({ displayModal, onClose, children }) => {
  return (
    <div className={`success-modal ${displayModal}`} onClick={onClose}>
      <div className="success-modal-cont" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <CloseIcon />
        </button>
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "#4caf50" }} />

        {children || (
          <>
            <h2>Success!</h2>
            <p>Data berhasil diproses.</p>
          </>
        )}
      </div>
    </div>
  );
};

export const InformationModal = ({
  displayModal,
  onClose,
  payload,
  onClick,
}) => {
  return (
    <div className={`information-modal ${displayModal}`} onClick={onClose}>
      <div
        className="information-modal-cont"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          <CloseIcon />
        </button>
        <h2>{payload.username}</h2>
        <p>{payload.nama}</p>
        <p>{payload.email}</p>
        <p>nip. {payload.nip}</p>
        <p>{payload.jabatan}</p>
        <p>level : {payload.level}</p>
        <button className="btn-proifle" onClick={onClick}>
          profile
        </button>
      </div>
    </div>
  );
};

export const NotifModal = ({ displayModal, onClose, children }) => {
  return (
    <div className={`notif-modal ${displayModal}`} onClick={onClose}>
      <div className="notif-modal-cont" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="close-btn" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export const ImageModal = ({ displayModal, onClose, url }) => {
  return (
    <div
      className={`image-modal ${displayModal ? "active" : ""}`}
      onClick={onClose}
    >
      <div className="image-modal-cont" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <CloseIcon />
        </button>
        <img src={url} alt="gambar dokumentasi" />
      </div>
    </div>
  );
};

export default FormModal;
