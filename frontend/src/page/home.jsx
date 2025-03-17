import { Navigate, useNavigate } from "react-router-dom";

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
      <p>Home</p>
      <button onClick={handleNavigate}>Generate PDF</button>
    </div>
  );
}
