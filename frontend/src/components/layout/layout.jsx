import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../../style/layout.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./header";
import { useState } from "react";

const Layout = () => {
  const [displaySidebar, setDisplaySidebar] = useState({
    sidebarDisplay: "",
    backgroundBlur: "",
  });
  const location = useLocation();
  const pageTitles = {
    "/": "Dashboard",
    "/about": "About Us",
    "/contact": "Contact Us",
  };
  const pagelocation = pageTitles[location.pathname] || "My Website";

  const handlerClickBlur = () => {
    if (displaySidebar.sidebarDisplay === "active") {
      setDisplaySidebar((prevState) => ({
        ...prevState,
        sidebarDisplay: "",
        backgroundBlur: "",
      }));
    }
  };
  const toggleSidebar = () => {
    setDisplaySidebar((prevState) => ({
      ...prevState,
      sidebarDisplay: prevState.sidebarDisplay === "active" ? "" : "active",
      backgroundBlur: prevState.sidebarDisplay === "active" ? "" : "blur",
    }));
  };
  useEffect(() => {
    document.title = pagelocation || "My Website";
  }, [pagelocation]);

  return (
    <div className="container">
      <Sidebar
        displaySidebar={displaySidebar.sidebarDisplay}
        handlerClickArrow={handlerClickBlur}
      />
      <div
        style={{ width: "100%" }}
        className={displaySidebar.backgroundBlur}
        onClick={handlerClickBlur}
      >
        <Header title={pagelocation} onToggleSidebar={toggleSidebar} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;
