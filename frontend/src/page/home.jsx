import "../style/home.css";
import CardSchedule from "../components/schedule/cardSchedule";
import BarChart from "../components/chart/barChart";
import fetchService from "../services/fetchService";
import { getToken } from "../utils/tokenManpulation";
import { useEffect } from "react";

// import { useNavigate } from "react-router-dom";

const emplyoee = [
  "udin sarudin mangarudi jalaludin sehat walafiat ss",
  "ucok",
  "ucup",
  "urip",
];
const activity = ["pdip", "komdigi", "kementrian agama", "uhuy"];
const Home = () => {
  // const navigate = useNavigate();
  const token = getToken("token");

  //use effect delete or refactor later
  useEffect(() => {
    const fetchData = async () => {
      try {
        //fix later
        const response = await fetchService("/asalGamink", token);
        console.log("id :" + response.data.id_user);
        console.log("username :" + response.data.username);
        console.log("email :" + response.data.email);
        console.log("level :" + response.data.level);
      } catch (error) {
        console.error("Error fetching :", error.message);
        //refactor jelek bet cok
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
