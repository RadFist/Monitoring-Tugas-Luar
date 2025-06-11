import "../style/layout.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { getToken } from "../utils/tokenManpulation";
import { jwtDecode } from "jwt-decode";

const Layout = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [payload, setPayload] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitles = {
    "/": "Dashboard",
    "/about": "About Us",
    "/contact": "Contact Us",
    "/User-Management": "User Management",
    "/Input-Tugas": "Input Tugas",
    "/Tugas-Luar": "List Tugas",
  };

  const pagelocation = pageTitles[location.pathname] || "My Website";

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setPayload(decoded);
    } catch (error) {
      console.error("Token tidak ditemukan:", error);
      navigate("/login");
    }
  }, []);

  const closeSideBar = () => {
    console.log(payload);

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
        userLevel={payload.level}
      />
      <div
        style={{ width: "100%" }}
        className={sidebarActive ? "blur" : ""}
        onClick={closeSideBar}
      >
        <Header onToggleSidebar={toggleSidebar} payload={payload} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;
