import BurgerBtn from "../components/BurgerBtn";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Tooltip, Avatar, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const Header = ({ title, onToggleSidebar }) => {
  const username = "";

  // Fungsi waktu berdasarkan jam lokal
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat pagi";
    else if (hour < 18) return "Selamat siang";
    else return "Selamat malam";
  };

  return (
    <header className="header-cont">
      <div className="left-side">
        <BurgerBtn toggleSidebar={onToggleSidebar} />
        <div>
          <Typography variant="h6" className="header-title">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {getGreeting()} 👋
          </Typography>
        </div>
      </div>

      <div className="right-side">
        <Tooltip title="Notifikasi">
          <button className="icon-btn" aria-label="notifications">
            <NotificationsNoneIcon sx={{ fontSize: 28 }} />
            <span className="icon-badge">5</span>
          </button>
        </Tooltip>

        <Avatar
          sx={{
            bgcolor: deepPurple[500],
            marginLeft: 2,
            width: 40,
            height: 40,
          }}
        >
          {username[0]}
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
