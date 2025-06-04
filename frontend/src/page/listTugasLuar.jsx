import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import "../style/listTugas.css";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";
import api from "../services/api";

const ListTugas = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [daftarTugas, setDaftarTugas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGetListTugas = (await api.get("/allTugas")).data;
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
              <button
                className="detail-button"
                onClick={(e) => {
                  e.preventDefault();
                  handlerClickDetail(item.id_tugas_luar);
                }}
              >
                Detail <ArrowIcon sx={{ fontSize: 14 }} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListTugas;
