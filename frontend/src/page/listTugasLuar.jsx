import { useState } from "react";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import "../style/listTugas.css";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";

const listTugas = () => {
  const [loading, setLoading] = useState(false);

  const dummyData = [
    {
      id: 1,
      nama: "Tugas Luar 1",
      alamat: "Jl. Merdeka No.1",
      tanggal: "2025-05-01",
      status: "Selesai",
    },
    {
      id: 2,
      nama: "Tugas Luar 2",
      alamat: "Jl. Sudirman No.10",
      tanggal: "2025-05-03",
      status: "Belum Selesai",
    },
    {
      id: 3,
      nama: "Tugas Luar 3",
      alamat: "Jl. Thamrin No.5",
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
        {dummyData.map((item) => (
          <div className="tugas-item" key={item.id}>
            <div className="tugas-header">
              <h3>{item.nama}</h3>
              <span
                className={`status ${item.status
                  .replace(" ", "-")
                  .toLowerCase()}`}
              >
                {item.status}
              </span>
            </div>
            <p>
              <strong>Alamat:</strong> {item.alamat}
            </p>
            <p>
              <strong>Tanggal:</strong> {item.tanggal}
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
