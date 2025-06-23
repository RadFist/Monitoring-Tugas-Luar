import "../style/home.css";
import CardSchedule from "../components/schedule/cardSchedule";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { IndicatorDahboard as Indicate } from "../components/chart/indicator";
import BarChart from "../components/chart/barChart";
import { useEffect, useState } from "react";
import api from "../services/api";
import { HeaderSecond } from "../layout/headerSecond";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

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
      <div className="dataWrapCard">
        <Indicate text="Total Tugas" data={1}>
          <img
            src="/svg/Project Management-svgrepo-com.svg"
            style={{ width: "100px" }}
          />
        </Indicate>
        <Indicate text="Total Pegawai" data={2}>
          <img src="/svg/people-svgrepo-com.svg" style={{ width: "100px" }} />
        </Indicate>
        <Indicate text="Total Arsip Dokumen" data={10}>
          <img
            src="/svg/archives preservation-svgrepo-com.svg"
            style={{ width: "90px" }}
          />
        </Indicate>
      </div>
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
