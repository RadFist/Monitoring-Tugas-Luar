import { useState } from "react";
import "../style/burger.css";
const BurgerBtn = ({ toggleSidebar }) => {
  const [state, setState] = useState("");
  const burgeHandlerClick = () => {
    setState((prevState) => (prevState === "active" ? "" : "active"));
    toggleSidebar();
  };
  return (
    <div className={`burger-cont ${state}`} onClick={burgeHandlerClick}>
      <span className="bar1"></span>
      <span className="bar2"></span>
      <span className="bar3"></span>
    </div>
  );
};
export default BurgerBtn;
