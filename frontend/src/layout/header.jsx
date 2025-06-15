import BurgerBtn from "../components/BurgerBtn";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Tooltip, Avatar, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useState } from "react";
import { InformationModal } from "../components/modal";

const Header = ({ onToggleSidebar, payload, notif }) => {
  const [modalActive, setModalActive] = useState(false);
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

  return (
    <header className="header-cont">
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
            <button className="icon-btn" aria-label="notifications">
              <NotificationsNoneIcon sx={{ fontSize: 28 }} />
              {notif.manny > 0 && (
                <span className="icon-badge">{notif.manny}</span>
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
