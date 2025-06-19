import { useNavigate, useParams } from "react-router-dom";
import "../style/detailPenugasan.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { useEffect, useState } from "react";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import api from "../services/api";
import { getToken } from "../utils/tokenManpulation";
import { jwtDecode } from "jwt-decode";
import { SuccessModal } from "../components/modal";
import axios from "axios";
import socket from "../services/socket";

const DetailPenugasan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [tugas, setTugas] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { idDetail } = useParams();
  const [imageUrl, setImageUrl] = useState([]);
  const token = getToken();
  const level = token ? jwtDecode(token).level : "";
  const nip = token ? jwtDecode(token).nip : "";
  const [assigned, setAssigned] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/tugas/detail/${idDetail}`);
        const tugasData = response.data.data;
        setTugas(tugasData);
        setAssigned(tugasData.pegawai.some((p) => p.nip === nip));

        if (tugasData.status_persetujuan === "approve") {
          setBtnDisabled(true);
        }
      } catch (error) {
        console.error("Error fetching tugas:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchFoto = async () => {
      try {
        const response = await api.get(`/documentation/${idDetail}`);
        setImageUrl(response.data.data);
      } catch (error) {
        console.error("Error fetching foto:", error.message);
      }
    };

    fetchData();
    fetchFoto();

    const handleFotoUpdate = () => {
      fetchFoto();
    };

    socket.on("foto", handleFotoUpdate);

    return () => {
      socket.off("foto", handleFotoUpdate);
    };
  }, []);

  useEffect(() => {
    if (tugas.status === "selesai") {
    } else {
      setTugas((prev) => {
        let newStatus = "belum mulai";

        if (imageUrl.length > 0) {
          newStatus = "dikerjakan";
        } else if (
          prev.status_persetujuan === "approve" ||
          prev.status === "Diproses"
        ) {
          newStatus = "Diproses";
        }

        return { ...prev, status: newStatus };
      });
    }
  }, [imageUrl]);

  const handleDownloadPDF = () => {
    navigate(`/generate/pdf/SPD`, {
      state: {
        data: tugas,
      },
    });
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile.type.startsWith("image/")) {
      alert("File yang dipilih bukan gambar!");
      return;
    }
    const formData = new FormData();
    formData.append("foto", selectedFile);
    formData.append("id", idDetail);
    try {
      const res = await axios.post(
        "http://localhost:8080/documentation",
        formData,
        {
          withCredentials: true, // jika perlu kirim cookie
        }
      );
      const newImagePath = res.data.filePath;
      setImageUrl((prev) => [...prev, { file_url: newImagePath }]);
    } catch (err) {
      console.log(err);
    }
  };

  const handlerDeleteFoto = (path) => {
    const pathname = path.file_url;
    api.delete("/documentation", {
      data: {
        idTugas: idDetail,
        pathName: pathname,
      },
    });
    setImageUrl((prev) => {
      const updated = prev.filter((item) => item.file_url != pathname);
      return updated;
    });
  };

  const handlerLaporan = (id) => {
    if (imageUrl.length < 1) {
      return alert("dokumentasi kosong");
    }
    if (assigned) {
      navigate(`/Laporan-Penugasan/${id}`);
    } else {
      if (tugas.status != "selesai") {
        return alert("yang ditugaskan belum mengisi laporan");
      }
      alert(id + " " + tugas.status);
    }
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
        const refreshed = await api.get(`/tugas/detail/idDetail}`);
        setTugas(refreshed.data.data);
      } catch (refreshError) {
        console.error("Gagal me-refresh data detail penugasan:", refreshError);
      }
      setBtnDisabled(true);
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
      <div className="header-detail">
        <button className="btn-kembali" onClick={() => navigate(-1)}>
          <ChevronLeftIcon /> Kembali
        </button>
        <h2 className="title-detail">Detail Penugasan</h2>
      </div>
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

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ color: "#1a73e8", fontWeight: "700" }}>
            {assigned ? "Upload" : ""} Dokumentasi
          </label>
          {assigned && tugas.status_persetujuan == "approve" && (
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
            />
          )}
        </div>
        <div className="image-preview-container">
          {loading && <Loading></Loading>}
          {imageUrl && (
            <>
              {imageUrl.map((value, index) => (
                <div key={index} className="warp-img-prev">
                  <img src={value.file_url} alt="Gambar hasil upload" />
                  {assigned && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handlerDeleteFoto(value);
                      }}
                    >
                      x
                    </button>
                  )}
                </div>
              ))}
            </>
          )}
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
        <div className={`btn-container-detail ${assigned ? "" : "level"}`}>
          {tugas.status_persetujuan === "approve" && (
            <button className="btn-pdf-detail" onClick={handleDownloadPDF}>
              Download PDF
              <DownloadIcon />
            </button>
          )}
          <div className="btn-cont-next">
            {level === "camat" && !btnDisabled && (
              <button
                className={`approve-detail-button ${
                  btnDisabled ? "btn-disabled" : ""
                }`}
                disabled={btnDisabled}
                onClick={() => handlerApprove(tugas.id_tugas_luar)}
              >
                Approve
                <CheckCircleIcon sx={{ fontSize: 16 }} />
              </button>
            )}
            {tugas.status != "belum mulai" &&
              tugas.status_persetujuan === "approve" && (
                <button
                  className={`laporan-button ${
                    imageUrl.length < 1 ? "btn-disabled" : ""
                  }`}
                  disabled={!btnDisabled}
                  onClick={(e) => {
                    e.preventDefault();
                    handlerLaporan(tugas.id_tugas_luar);
                  }}
                >
                  {(!assigned && <>Laporan PDF</>) || (
                    <>
                      Laporan
                      <SummarizeIcon sx={{ fontSize: 16 }} />
                    </>
                  )}
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPenugasan;
