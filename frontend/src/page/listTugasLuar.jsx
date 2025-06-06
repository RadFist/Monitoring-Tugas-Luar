import "../style/listTugas.css";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/tokenManpulation";
import api from "../services/api";

const ListTugas = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [daftarTugas, setDaftarTugas] = useState([]);
  const token = getToken();
  const level = token ? jwtDecode(token).level : "";
  let routeList = token === "camat" ? "/allTugas/approval" : "/allTugas";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGetListTugas = (await api.get(routeList)).data;
        setDaftarTugas(responseGetListTugas.data);
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
  //   console.log(daftarTugas);
  // }, [daftarTugas]);

  if (loading) {
    return (
      <div className="content-list-tugas-loading">
        <Loading />
      </div>
    );
  }

  const handlerClickDetail = (id) => {
    navigate(`Detail-Penugasan/${id}`);
  };

  const handlerApprove = async (id) => {
    if (!id) {
      console.error("ID tugas tidak valid.");
      return;
    }

    try {
      const response = await api.patch(`/PenugasanTugasLuar/Approve`, {
        id: id,
      });

      if (response.data && response.data.success) {
        console.log("Tugas berhasil disetujui.");

        const responseGetListTugas = (await api.get(routeList)).data;
        setDaftarTugas(responseGetListTugas.data);
      } else {
        console.warn(response.data?.message || "Gagal menyetujui tugas.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyetujui tugas:", error);
    }
  };

  return (
    <div className="content-list-tugas">
      <div className="list-tugas">
        {daftarTugas.length === 0 ? (
          <p style={{ textAlign: "center" }} className="no-tugas-message">
            Tidak ada tugas baru-baru ini
          </p>
        ) : (
          daftarTugas.map((item) => (
            <div className="tugas-item" key={item.id_tugas_luar}>
              <div className="tugas-header">
                <h3>{item.judul_tugas}</h3>
                <span
                  className={`status ${item.status
                    .replace(" ", "-")
                    .toLowerCase()}`}
                >
                  {item.status}
                </span>
              </div>
              <p>
                <strong>lokasi:</strong> {item.lokasi}
              </p>
              <p>
                <strong>tanggal:</strong> {item.tanggal_mulai}
              </p>
              <div className="button-cont-listTugas">
                <button
                  className="detail-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handlerClickDetail(item.id_tugas_luar);
                  }}
                >
                  Detail <ArrowIcon sx={{ fontSize: 14 }} />
                </button>
                {level === "camat" && (
                  <button
                    className="approve-button"
                    onClick={() => handlerApprove(item.id_tugas_luar)}
                  >
                    Approve
                    <CheckCircleIcon sx={{ fontSize: 14 }} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListTugas;
