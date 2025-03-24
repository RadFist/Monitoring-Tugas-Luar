import "../../style/layout.css";
import BurgerBtn from "../../components/BurgerBtn";
import { IoIosNotificationsOutline } from "react-icons/io";
const Header = (props) => {
  const { title, onToggleSidebar } = props;
  function handlerClickNotif() {
    alert(0);
  }
  return (
    <div className="header-cont">
      <div className="left-side">
        <BurgerBtn toggleSidebar={onToggleSidebar} />
        <p>{title}</p>
      </div>
      <div>
        <button className="icon-btn">
          <IoIosNotificationsOutline size={30} onClick={handlerClickNotif} />
          <span className="icon-badge">5</span>
        </button>
      </div>
    </div>
  );
};
export default Header;
