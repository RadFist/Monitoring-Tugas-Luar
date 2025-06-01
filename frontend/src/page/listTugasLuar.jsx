import { useEffect, useState } from "react";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import "../style/listTugas.css";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";
import api from "../services/api";

const listTugas = () => {
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
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(daftarTugas);
  }, [daftarTugas]);

  const dummyData = [
    {
      id_tugas_luar: 1,
      judul_tugas: "Tugas Luar 1",
      lokasi: "Jl. Merdeka No.1",
      tanggal: "2025-05-01",
      status: "Selesai",
    },
    {
      id_tugas_luar: 2,
      judul_tugas: "Tugas Luar 2",
      lokasi: "Jl. Sudirman No.10",
      tanggal: "2025-05-03",
      status: "Belum Selesai",
    },
    {
      id_tugas_luar: 3,
      judul_tugas: "Tugas Luar 3",
      lokasi: "Jl. Thamrin No.5",
      tanggal: "2025-05-05",
      status: "Diproses",
    },
  ];

  if (loading) {
    return (
      <div className="content-list-tugas-loading">
        <Loading />
      </div>
    );
  }

  return (
    <div className="content-list-tugas">
      <div className="list-tugas">
        {daftarTugas.map((item) => (
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
            <button className="detail-button">
              Detail <ArrowIcon sx={{ fontSize: 14 }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default listTugas;
