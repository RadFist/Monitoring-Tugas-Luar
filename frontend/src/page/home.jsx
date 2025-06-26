import "../style/home.css";
import CardSchedule from "../components/schedule/cardSchedule";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IndicatorDahboard as Indicate } from "../components/chart/indicator";
import BarChart from "../components/chart/barChart";
import { useEffect, useState } from "react";
import api from "../services/api";
import { HeaderSecond } from "../layout/headerSecond";
import { data, useNavigate } from "react-router-dom";

const Home = () => {
  const [dataKegiatan, setDataKegiatan] = useState([]);
  const [count, setCount] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = (await api.get("/dashboard")).data.data;
        setCount(responseData.count);
        setDataKegiatan(responseData.list);
      } catch (error) {
        console.error("Error fetching:", error.message);
      }
    };

    fetchData();
  }, []);

  const handlerClickDetai = (params) => {
    navigate(`/Tugas-Luar?date=${params}`);
  };
  return (
    <div>
      <HeaderSecond text="Dashboard"></HeaderSecond>
      <div className="dataWrapCard">
        <Indicate text="Total Pegawai" data={count.user}>
          <img src="/svg/people-svgrepo-com.svg" style={{ width: "100px" }} />
        </Indicate>

        <Indicate text="Total Tugas" data={count.tugas}>
          <img
            src="/svg/Project Management-svgrepo-com.svg"
            style={{ width: "100px" }}
          />
        </Indicate>

        <Indicate text="Total Pending" data={count.pending}>
          <img
            src="/svg/archives preservation-svgrepo-com.svg"
            style={{ width: "90px" }}
          />
        </Indicate>

        <Indicate text="Total Arsip Dokumen" data={count.arsip}>
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
          {dataKegiatan.length > 0 ? (
            <div className="schedule-list">
              {dataKegiatan.map((value) => (
                <CardSchedule
                  key={value.tanggal}
                  time={value.tanggal}
                  data={value.kegiatan}
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
