import "../style/layout.css";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

const Layout = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/about": "About Us",
    "/contact": "Contact Us",
    "/User-Management": "User Management",
    "/Input-Tugas": "Input Tugas",
    "/Tugas-Luar": "List Tugas",
  };

  const pagelocation = pageTitles[location.pathname] || "My Website";

  const closeSideBar = () => {
    setSidebarActive(false);
  };

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  document.title = pagelocation || "My Website";

  return (
    <div className="container">
      <Sidebar
        displaySidebar={sidebarActive ? "active" : ""}
        handlerClickArrow={closeSideBar}
      />
      <div
        style={{ width: "100%" }}
        className={sidebarActive ? "blur" : ""}
        onClick={closeSideBar}
      >
        <Header onToggleSidebar={toggleSidebar} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;
