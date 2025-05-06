import "../style/burger.css";
import BurgerIcon from "@mui/icons-material/Menu";

const BurgerBtn = ({ toggleSidebar }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    toggleSidebar();
  };

  return (
    <button
      className="burger-cont"
      onClick={handleClick}
      aria-label="Toggle Sidebar"
    >
      <BurgerIcon sx={{ color: "rgb(129, 121, 244)" }} />

      {/* <span className="bar bar1"></span>
      <span className="bar bar2"></span>
      <span className="bar bar3"></span> */}
    </button>
  );
};

export default BurgerBtn;
