import BackArrow from "@mui/icons-material/KeyboardBackspace";
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
    navigate("/generate", { state: data }); // Pindah ke halaman /generate
  };

  // refactor later revoke token
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
              size={20}
              className="arrow-left"
              onClick={handlerClickArrow}
            />
          </button>
        </div>
        <div className="menu-cont">
          <span
            onClick={() => {
              navigate("/");
              handlerClickArrow();
            }}
          >
            Dashboard
          </span>
          <span
            onClick={() => {
              navigate("/UserManagemet");
              handlerClickArrow();
            }}
          >
            Manajemen Pengguna
          </span>
          <span>Tugas Luar</span>
          <span>Monitoring dan Laporan</span>
          <span>Dokumentasi Arsip</span>
          <a href="/about">about</a>
          <a style={{ cursor: "pointer" }} onClick={handleNavigate}>
            Generate PDF
          </a>
          <a onClick={handlerLogOut}>Logout</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
