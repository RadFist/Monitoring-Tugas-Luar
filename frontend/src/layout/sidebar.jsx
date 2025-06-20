import BackArrow from "@mui/icons-material/KeyboardBackspace";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ListAlt from "@mui/icons-material/ListAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArchiveIcon from "@mui/icons-material/Archive";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../utils/tokenManpulation";
import { logoutUser } from "../services/authServices";
import socket from "../services/socket";

const Sidebar = ({ displaySidebar = false, handlerClickArrow, userLevel }) => {
  const navigate = useNavigate();

  const handlerLogOut = async (event) => {
    event.preventDefault();
    try {
      socket.emit("manual-logout");
      await logoutUser();
    } catch (error) {
      clearToken();
      console.error("Logout gagal:", error.message);
    }
    navigate("/login");
  };

  return (
    <aside className={`sidebar-cont ${displaySidebar ? "active" : ""}`}>
      <div className="sidebar-content">
        <div className="side-header">
          <span>Menu</span>
          <button className="close-sidebar">
            <BackArrow
              fontSize="medium"
              className="arrow-left"
              onClick={handlerClickArrow}
            />
          </button>
        </div>
        <div className="menu-cont">
          <div
            className="menu-item"
            onClick={() => {
              navigate("/");
              handlerClickArrow();
            }}
          >
            <DashboardIcon /> <span>Dashboard</span>
          </div>
          {userLevel == "super admin" && (
            <div
              className="menu-item"
              onClick={() => {
                navigate("/User-Management");
                handlerClickArrow();
              }}
            >
              <PeopleIcon /> <span>Manajemen Pengguna</span>
            </div>
          )}

          <div
            className="menu-item"
            onClick={() => {
              navigate("/Tugas-Luar");
              handlerClickArrow();
            }}
          >
            <ListAlt />{" "}
            <span>
              {" "}
              {userLevel === "camat" ? "Approval Tugas" : "Tugas Luar"}
            </span>
          </div>
          {userLevel == "kasi" && (
            <div
              className="menu-item"
              onClick={() => {
                navigate("/Input-Tugas");
                handlerClickArrow();
              }}
            >
              <AssignmentIcon /> <span>Penugasan</span>
            </div>
          )}
          <div className="menu-item">
            <ArchiveIcon /> <span>Dokumentasi Arsip</span>
          </div>
          <div
            className="menu-item"
            onClick={() => {
              navigate("/about");
              handlerClickArrow();
            }}
          >
            <InfoIcon /> <span>About</span>
          </div>
          <div className="menu-item" onClick={handlerLogOut}>
            <LogoutIcon /> <span>Logout</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
