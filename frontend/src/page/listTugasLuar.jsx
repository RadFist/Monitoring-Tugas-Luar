import "../style/listTugas.css";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/tokenManpulation";
import { SuccessModal } from "../components/modal";
import api from "../services/api";

const ListTugas = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [daftarTugas, setDaftarTugas] = useState([]);
  const token = getToken();
  const payload = token ? jwtDecode(token) : "";
  const level = payload.level;
  const roleRoutes = {
    camat: "/allTugas/approval",
    user: "/tugas/" + payload.id_user,
  };
  let routeList = roleRoutes[level] || "/allTugas";

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
  //   console.log(payload);
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
  const handlerCloseModal = () => {
    setModalActive(false);
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
        try {
          const responseRefreshedGetListTugas = (await api.get(routeList)).data;
          setDaftarTugas(responseRefreshedGetListTugas.data);
        } catch (error) {}
      } else {
        console.error("Gagal memperbarui daftar tugas:", error);
      }
      setModalActive(true);
    } catch (error) {
      console.error("Terjadi kesalahan saat menyetujui tugas:", error);
    }
  };

  return (
    <div className="content-list-tugas">
      <div className="list-tugas">
        <SuccessModal
          displayModal={modalActive ? "active" : ""}
          onClose={handlerCloseModal}
        />
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
