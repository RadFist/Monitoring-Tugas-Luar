import "../style/loading.css";
import { BarLoader } from "react-spinners";
const loadingPage = () => {
  return (
    <div className="loading-page-cont">
      <div className="loading-logo-wrap">
        {/* <img src="/img/logokab.png" alt="Logo" /> */}
        {/* <span>LOADING...</span> */}
        <BarLoader color="#7157ff" size={60} />
      </div>
    </div>
  );
};

export default loadingPage;
