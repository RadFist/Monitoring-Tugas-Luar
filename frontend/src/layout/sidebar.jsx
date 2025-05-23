import BackArrow from "@mui/icons-material/KeyboardBackspace";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArchiveIcon from "@mui/icons-material/Archive";
import InfoIcon from "@mui/icons-material/Info";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import { clearToken } from "../utils/tokenManpulation";
import { logoutUser } from "../services/authServices";

const Sidebar = ({ displaySidebar, handlerClickArrow }) => {
  const navigate = useNavigate();

  const handleNavigate = (event) => {
    event.preventDefault();
    const data = {
      title: "Disposisi Surat",
      content: "Isi surat yang mau dimunculkan di PDF",
    };
    navigate("/generate", { state: data });
  };

  const handlerLogOut = async (event) => {
    event.preventDefault();
    try {
      await logoutUser();
    } catch (error) {
      clearToken();
      console.error("Logout gagal:", error.message);
    }
    navigate("/login");
  };

  return (
    <aside className={`sidebar-cont ${displaySidebar}`}>
      <div className="sidebar-content">
        <div className="side-header">
          <span>Username</span>
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
          <div
            className="menu-item"
            onClick={() => {
              navigate("/User-Managemet");
              handlerClickArrow();
            }}
          >
            <PeopleIcon /> <span>Manajemen Pengguna</span>
          </div>
          <div
            className="menu-item"
            onClick={() => {
              navigate("/Tugas-Luar");
              handlerClickArrow();
            }}
          >
            <TravelExploreIcon /> <span>Tugas Luar</span>
          </div>
          <div
            className="menu-item"
            onClick={() => {
              navigate("/Input-Tugas");
              handlerClickArrow();
            }}
          >
            <AssignmentIcon /> <span>Input Tugas</span>
          </div>
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
          <div className="menu-item" onClick={handleNavigate}>
            <PictureAsPdfIcon /> <span>Generate PDF</span>
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
