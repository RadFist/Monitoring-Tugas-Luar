import BurgerBtn from "../components/BurgerBtn";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Tooltip, Avatar, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useState } from "react";
import { InformationModal, NotifModal } from "../components/modal";

const Header = ({
  onToggleSidebar,
  payload,
  notifData,
  notifManny,
  message,
  displayModal,
  onMannyReset,
  onClose,
}) => {
  const [modalActive, setModalActive] = useState(false);
  const [modalNotifActive, setModalNotifActive] = useState(false);
  const username = payload.username || "";
  // Fungsi waktu berdasarkan jam lokal
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12 && hour >= 5) return "Selamat pagi ⛅";
    else if (hour < 18 && hour >= 12) return "Selamat siang ☀️";
    else return "Selamat malam 🌙";
  };

  const handlerCloseModal = () => {
    setModalActive(false);
  };
  const handlerCloseNotifModal = () => {
    setModalNotifActive(false);
    if (notifManny > 0) {
      onMannyReset();
      // fetch untuk reset notif
    }
  };

  return (
    <header className="header-cont">
      <NotifModal displayModal={displayModal ? "active" : ""} onClose={onClose}>
        <p>🔔{message}</p>
      </NotifModal>
      <NotifModal
        displayModal={modalNotifActive ? "active" : ""}
        onClose={handlerCloseNotifModal}
      >
        <div style={{ overflow: "auto", maxHeight: "470px" }}>
          {(!notifData || notifData.length < 1) && <p>Tidak ada notifikasi</p>}
          {notifData?.map((value, index) => (
            <div key={index}>
              <p>{value.message}</p>
              <p>{value.created_at}</p>
            </div>
          ))}
        </div>
      </NotifModal>
      <InformationModal
        displayModal={modalActive ? "active" : ""}
        onClose={handlerCloseModal}
        payload={payload}
      />
      <div className="left-side">
        <BurgerBtn toggleSidebar={onToggleSidebar} />
        <div>
          <Typography variant="h6" className="header-title">
            Kecamatan Sukadiri{" "}
            <img
              src="/img/logokab.png"
              alt="img-logo"
              style={{
                width: "30px",
                height: "30px",
                objectFit: "contain",
              }}
            />
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {getGreeting()} 👋
          </Typography>
        </div>
      </div>

      <div className="right-side">
        {payload.level != "super admin" && (
          <Tooltip title="Notifikasi">
            <button
              className="icon-btn"
              onClick={(e) => {
                e.preventDefault();
                setModalNotifActive(true);
              }}
              aria-label="notifications"
            >
              <NotificationsNoneIcon sx={{ fontSize: 28 }} />
              {notifManny > 0 && (
                <span className="icon-badge">{notifManny}</span>
              )}
            </button>
          </Tooltip>
        )}

        <Tooltip title="Profile">
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              marginLeft: 2,
              width: 40,
              height: 40,
            }}
            onClick={() => {
              setModalActive("active");
            }}
          >
            {username[0]}
          </Avatar>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
