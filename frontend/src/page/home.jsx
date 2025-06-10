import "../style/home.css";
import CardSchedule from "../components/schedule/cardSchedule";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BarChart from "../components/chart/barChart";
import { useEffect, useState } from "react";
import api from "../services/api";
import { HeaderSecond } from "../layout/headerSecond";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [grupTugas, setGrupTugas] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await api.get("/allTugas?grup=date")).data;
        setGrupTugas(response.data);
      } catch (error) {
        console.error("Error fetching:", error.message);
      }
    };

    fetchData();
  }, []);

  const handlerClickDetai = (params) => {
    navigate(`/Tugas-Luar?filterDate=${params}`);
  };
  return (
    <div>
      <HeaderSecond text="Dashboard"></HeaderSecond>
      <div className="home-container">
        <section className="schedule-section">
          <h2 className="schedule-title">
            📅 Jadwal Kegiatan yang akan datang
          </h2>
          {grupTugas.length > 0 ? (
            <div className="schedule-list">
              {grupTugas.map((value) => (
                <CardSchedule
                  key={value.tanggal}
                  time={value.tanggal}
                  listActivity={value.kegiatan}
                  listEmployee={value.pegawai}
                  handlerClick={() => handlerClickDetai(value.tanggalNumber)}
                />
              ))}
              <div className="btn-semua-tugas">
                <button
                  className="btn-icon-semua-tugas"
                  onClick={() => {
                    navigate(`/Tugas-Luar`);
                  }}
                >
                  <ChevronRightIcon fontSize="large" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="schedule-list empty">
                <span>Data Kosong</span>
              </div>
            </div>
          )}
        </section>

        <section className="chart-section">
          <div className="chart-box">
            <BarChart />
          </div>
          <div className="chart-box">
            <BarChart />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
