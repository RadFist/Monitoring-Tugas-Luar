import BurgerBtn from "../components/BurgerBtn";
import Notif from "@mui/icons-material/NotificationsNone";

const Header = (props) => {
  const { title, onToggleSidebar } = props;

  return (
    <div className="header-cont">
      <div className="left-side">
        <BurgerBtn toggleSidebar={onToggleSidebar} />
        <p>{title}</p>
      </div>
      <div>
        <button className="icon-btn">
          <Notif sx={{ fontSize: 30 }} />
          <span className="icon-badge">5</span>
        </button>
      </div>
    </div>
  );
};
export default Header;
