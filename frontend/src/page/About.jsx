import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import "../style/about.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">
          <InfoIcon
            style={{
              verticalAlign: "middle",
              marginRight: "8px",
              color: "#3f51b5",
            }}
          />
          Tentang Aplikasi
        </h1>

        <p className="about-description">
          Sistem Informasi Monitoring Tugas Luar ini merupakan aplikasi berbasis
          web yang dikembangkan untuk membantu pengelolaan, pelaksanaan, dan
          pelaporan tugas luar bagi pegawai di lingkungan{" "}
          <strong>Kecamatan Sukadiri</strong>.
        </p>

        <p className="about-description">
          Dengan adanya sistem ini, proses administrasi tugas luar menjadi lebih
          efisien, akuntabel, dan terdokumentasi secara digital. Fitur utama
          mencakup:
        </p>

        <ul className="about-features">
          <li>📌 Penjadwalan dan pencatatan tugas luar</li>
          <li>🧾 Penyimpanan laporan kegiatan</li>
          <li>🔍 Monitoring status tugas secara real-time</li>
          <li>📥 Pembuatan laporan otomatis dalam bentuk PDF</li>
        </ul>

        <p className="about-tech">
          Aplikasi ini dibangun menggunakan teknologi modern seperti{" "}
          <strong>React</strong>, <strong>Node.js</strong>, dan{" "}
          <strong>MySQL</strong>, serta dirancang dengan antarmuka yang
          responsif dan mudah digunakan.
        </p>
      </div>
    </div>
  );
};

export default About;
