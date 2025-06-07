import { useNavigate, useParams } from "react-router-dom";
import "../style/detailPenugasan.css";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import api from "../services/api";
import { getToken } from "../utils/tokenManpulation";
import { jwtDecode } from "jwt-decode";
import { SuccessModal } from "../components/modal";

const DetailPenugasan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [tugas, setTugas] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState("");
  const { idDetail } = useParams();
  const token = getToken();
  const level = token ? jwtDecode(token).level : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGetTugasById = (
          await api.get(`/Detail-Penugasan/${idDetail}`)
        ).data;
        setTugas(responseGetTugasById.data);
        if (responseGetTugasById.data.status_persetujuan === "approve") {
          setBtnDisabled("btn-disabled");
        }
      } catch (error) {
        console.error("Error fetching :", error.message);
      } finally {
        setLoading(false);
        //kalo error dia kosong anjir
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(tugas);
  // }, [tugas]);

  const handleDownloadPDF = () => {
    navigate(`/generate/pdf/SPD`, {
      state: {
        data: tugas,
      },
    });
  };
  const handlerCloseModal = () => {
    setModalActive(false);
  };

  const handlerApprove = async (id) => {
    if (!id) {
      console.error("ID tugas tidak valid.");
      return;
    }

    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menyetujui tugas ini?"
    );
    if (!konfirmasi) {
      return; // Batal approve jika user klik "Batal"
    }

    try {
      await api.patch(`/PenugasanTugasLuar/Approve`, { id });
      try {
        const refreshed = await api.get(`/Detail-Penugasan/${idDetail}`);
        setTugas(refreshed.data.data);
      } catch (refreshError) {
        console.error("Gagal me-refresh data detail penugasan:", refreshError);
      }
      setBtnDisabled("btn-disabled");
      setModalActive(true); // Tampilkan modal sukses
    } catch (error) {
      console.error("Terjadi kesalahan saat menyetujui tugas:", error);
    }
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
      <SuccessModal
        displayModal={modalActive ? "active" : ""}
        onClose={handlerCloseModal}
      />
      <h2 className="title-detail">Detail Penugasan</h2>
      <div className="card-detail">
        <div className="info-detail">
          <p>
            <strong>Nama Tugas:</strong> {tugas.judul_tugas}
          </p>
          <p>
            <strong>Dasar:</strong> {tugas.dasar}
          </p>
          <p>
            <strong>Perihal:</strong> {tugas.perihal}
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
          <p>
            <strong>Status Persetujuan:</strong>{" "}
            <span
              className={`status ${tugas.status_persetujuan
                ?.toLowerCase()
                .replace(" ", "-")}`}
            >
              {tugas.status_persetujuan || "Belum Ada"}
            </span>
          </p>
          <p>
            <strong>Deskripsi:</strong> {tugas.deskripsi}
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
            Download PDF
            <DownloadIcon />
          </button>
          {level === "camat" && (
            <button
              className={`approve-detail-button ${btnDisabled}`}
              disabled={btnDisabled === "btn-disabled"}
              onClick={() => handlerApprove(tugas.id_tugas_luar)}
            >
              Approve
              <CheckCircleIcon sx={{ fontSize: 16 }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPenugasan;
