import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../utils/tokenManpulation";
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

  // refactor later
  const handlerLogOut = (event) => {
    event.preventDefault;
    clearToken();
    navigate("/login");
  };

  return (
    <aside className={`sidebar-cont ${displaySidebar}`}>
      <div className="sidebar-content">
        <div className="side-header">
          <span>Username</span>
          <button className="close-sidebar">
            <FaArrowLeft
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
          <a onClick={handlerLogOut}>Login</a>
          <a href="/about">about</a>
          <a style={{ cursor: "pointer" }} onClick={handleNavigate}>
            Generate PDF
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
