import "../style/home.css";
import CardSchedule from "../components/schedule/cardSchedule";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IndicatorDahboard as Indicate } from "../components/chart/indicator";
import BarChart from "../components/chart/barChart";
import { useEffect, useState } from "react";
import api from "../services/api";
import { HeaderSecond } from "../layout/headerSecond";
import { useNavigate } from "react-router-dom";
import { ListUserProductivity } from "../components/listManagement";
import { loadingCompSpin as LoadingSpin } from "../components/LoadingComp";

const Home = () => {
  const [dataKegiatan, setDataKegiatan] = useState([]);
  const [dataTopPegawai, setDataTopPegawai] = useState([]);
  const [dataBarChart, setDataBarChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = (await api.get("/dashboard")).data.data;
        setCount(responseData.count);
        setDataTopPegawai(responseData.userProductivity);
        setDataKegiatan(responseData.list);
        setDataBarChart(responseData.TugasbyMonth);
      } catch (error) {
        console.error("Error fetching:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlerClickDetai = (params) => {
    navigate(`/Tugas-Luar?date=${params}`);
  };

  if (loading) {
    return (
      <div style={{ height: "80vh" }}>
        <LoadingSpin />;
      </div>
    );
  }

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
            src="/svg/waiting-list-clock-svgrepo-com.svg"
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
            <BarChart data={dataBarChart} />
          </div>
          <div className="chart-box">
            <ListUserProductivity data={dataTopPegawai} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
