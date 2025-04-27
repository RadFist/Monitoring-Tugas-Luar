import "../style/home.css";
import CardSchedule from "../components/schedule/cardSchedule";
import BarChart from "../components/chart/barChart";
import { useEffect } from "react";
import api from "../services/api";

const emplyoee = [
  "udin sarudin mangarudi jalaludin sehat walafiat ss",
  "ucok",
  "ucup",
  "urip",
];
const activity = ["pdip", "komdigi", "kementrian agama", "uhuy"];
const Home = () => {
  // const navigate = useNavigate();

  //use effect delete or refactor later
  useEffect(() => {
    const fetchData = async () => {
      try {
        //fix later
        const response = (await api.post("/asalGamink")).data;

        // refactor later
        const data = {
          A_id: response.data.id_user,
          B_username: response.data.username,
          C_email: response.data.email,
          D_level: response.data.level,
        };

        console.log(data);
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
