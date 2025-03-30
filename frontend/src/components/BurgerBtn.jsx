import { useState } from "react";
import "../style/burger.css";
const BurgerBtn = ({ toggleSidebar }) => {
  const burgeHandlerClick = (e) => {
    e.stopPropagation();
    toggleSidebar();
  };
  return (
    <div className={`burger-cont`} onClick={burgeHandlerClick}>
      <span className="bar1"></span>
      <span className="bar2"></span>
      <span className="bar3"></span>
    </div>
  );
};
export default BurgerBtn;
