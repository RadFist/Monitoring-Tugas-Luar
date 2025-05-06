import "../style/home.css";
import CardSchedule from "../components/schedule/cardSchedule";
import BarChart from "../components/chart/barChart";
import { useEffect } from "react";
import api from "../services/api";

const employee = ["Udin Sarudin", "Ucok", "Ucup", "Urip"];

const activities = ["PDIP", "Komdigi", "Kementerian Agama", "Uhuy"];

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await api.post("/asalGamink")).data;

        const data = {
          id: response.data.id_user,
          username: response.data.username,
          email: response.data.email,
          level: response.data.level,
        };

        console.log(data);
      } catch (error) {
        console.error("Error fetching:", error.message);
        if (error.message === "token expired") {
          // navigate("/login");
          // clearToken();
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <section className="schedule-section">
        <h2 className="schedule-title">📅 Jadwal Kegiatan</h2>
        <div className="schedule-list">
          <CardSchedule
            time="10 Maret 2025"
            listActivity={activities}
            listEmployee={employee}
          />
          <CardSchedule />
          <CardSchedule />
          <CardSchedule />
        </div>
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
  );
};

export default Home;
