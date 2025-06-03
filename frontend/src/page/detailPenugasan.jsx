import { useNavigate, useParams } from "react-router-dom";
import "../style/detailPenugasan.css";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState } from "react";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import api from "../services/api";

const DetailPenugasan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tugas, setTugas] = useState([]);
  const { idDetail } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGetTugasById = (
          await api.get(`/Detail-Penugasan/${idDetail}`)
        ).data;
        setTugas(responseGetTugasById.data);
      } catch (error) {
        console.error("Error fetching :", error.message);
      } finally {
        setLoading(false);
        //kalo error dia kosong anjir
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(tugas);
  }, [tugas]);

  const handleDownloadPDF = () => {
    navigate(`/generate/pdf/SPD`, {
      state: {
        data: tugas,
      },
    });
  };

  if (loading) {
    return (
      <div className="content-list-tugas-loading">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container-detail">
      <h2 className="title-detail">Detail Penugasan</h2>
      <div className="card-detail">
        <div className="info-detail">
          <p>
            <strong>Nama Tugas:</strong> {tugas.judul_tugas}
          </p>
          <p>
            <strong>Deskripsi:</strong> {tugas.deskripsi}
          </p>
          <p>
            <strong>Lokasi:</strong> {tugas.lokasi}
          </p>
          <p>
            <strong>Tanggal Mulai:</strong> {tugas.tanggal_mulai}
          </p>
          <p>
            <strong>Tanggal Selesai:</strong> {tugas.tanggal_selesai}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`status ${tugas.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {tugas.status}
            </span>
          </p>
        </div>
        <div className="pegawai-list-detail">
          <h3>Daftar Pegawai Ditugaskan</h3>
          <ul>
            {tugas.pegawai.map((pegawai) => (
              <li key={pegawai.id_user} className="pegawai-item-detail">
                <p className="nama-detail">{pegawai.nama}</p>
                <p className="nip-detail">NIP: {pegawai.nip}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="btn-container-detail">
          <button className="btn-pdf-detail" onClick={handleDownloadPDF}>
            <DownloadIcon />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPenugasan;
