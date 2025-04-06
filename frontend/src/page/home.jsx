import "../style/home.css";
import CardSchedule from "../components/schedule/cardSchedule";
import BarChart from "../components/chart/barChart";
import fetchService from "../services/fetchService";

import { useEffect } from "react";

const emplyoee = [
  "udin sarudin mangarudi jalaludin sehat walafiat ss",
  "ucok",
  "ucup",
  "urip",
];
const activity = ["pdip", "komdigi", "kementrian agama", "uhuy"];
const Home = () => {
  // useEffect(async () => {
  //   const response = await fetchService("/dashboard");
  //   alert(response);
  // }, []);

  return (
    <div className="home-container">
      <div className="schedule-cont">
        <span className="title-schedule">Jadwal</span>
        <div className="schedule-card-cont">
          <CardSchedule
            time="10 march 2025"
            listActivity={activity}
            listEmployee={emplyoee}
          />
          <CardSchedule />
          <CardSchedule />
          <CardSchedule />
        </div>
      </div>
      <div className="chart-cont">
        <div className="chart1-cont">
          <BarChart />
        </div>
        <div className="chart2-cont">
          <BarChart />
        </div>
      </div>
    </div>
  );
};
export default Home;
