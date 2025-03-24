import { FaArrowLeft } from "react-icons/fa";
import "../../style/layout.css";
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button className="close-sidebar">
          <FaArrowLeft
            size={30}
            className="arrow-left"
            onClick={handlerClickArrow}
          />
        </button>
        <a href="login">Login</a>
        <a href="/about">about</a>
        <a onClick={handleNavigate}>Generate PDF</a>
      </div>
    </aside>
  );
};

export default Sidebar;
