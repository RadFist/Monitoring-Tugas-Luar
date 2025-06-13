import "../style/layout.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { getToken } from "../utils/tokenManpulation";
import { jwtDecode } from "jwt-decode";
import socket from "../services/socket";
import api from "../services/api";
import notifSound from "../assets/sound/notifSound.mp3";

const Layout = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [payload, setPayload] = useState({});
  const [notification, setNotification] = useState({
    data: {},
    manny: "",
  });
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
    const fetchData = async (id) => {
      try {
        const result = (await api.get(`/notification/${id}`)).data;
        const data = result?.data ?? []; // fallback ke array kosong
        const length = data.length;

        setNotification({
          data,
          manny: length,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setPayload(decoded);

      socket.emit("register-user", decoded.id_user);

      if (decoded.level != "super admin") {
        fetchData(decoded.id_user);

        socket.on("notification", (data) => {
          // alert(`🔔 ${data.message}`);
          fetchData(decoded.id_user);
          //refactor g bisa play karan browser tidak mengijinkan suara auto play tanpa interaksi user
          const audio = new Audio(notifSound);
          audio.play().catch((err) => {
            console.error("Gagal memutar suara:", err);
          });
        });

        return () => {
          socket.off("notification");
        };
      }
    } catch (error) {
      console.error("Token tidak valid:", error);
      navigate("/login");
    }
  }, []);

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
        userLevel={payload.level}
      />
      <div
        style={{ width: "100%" }}
        className={sidebarActive ? "blur" : ""}
        onClick={closeSideBar}
      >
        <Header
          onToggleSidebar={toggleSidebar}
          payload={payload}
          notif={notification}
        />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;
