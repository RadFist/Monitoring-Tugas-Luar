import { Navigate, useNavigate } from "react-router-dom";
import BurgerBtn from "../components/BurgerBtn";
import Sidebar from "../components/layout/sidebar";
export default function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const data = {
      title: "Disposisi Surat",
      content: "Isi surat yang mau dimunculkan di PDF",
    };
    navigate("/generate", { state: data }); // Pindah ke halaman /generate
  };

  return (
    <div>
      <BurgerBtn />
      <div className="content">
        <p>Home</p>
        <button onClick={handleNavigate}>Generate PDF</button>
        <a href="login">Login</a>
        <a href="/about">about</a>
      </div>
    </div>
  );
}
