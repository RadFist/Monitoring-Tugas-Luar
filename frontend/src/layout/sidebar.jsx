import { FaArrowLeft } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

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
        <div
          style={{
            marginLeft: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Dashboard</span>
          <span>Manajemen Pengguna</span>
          <span>Tugas Luar</span>
          <span>Monitoring dan Laporan</span>
          <span>Dokumentasi Arsip</span>
          <a href="login">Login</a>
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
