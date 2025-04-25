import "../style/loading.css";
import { BarLoader, MoonLoader } from "react-spinners";
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

export const loadingCompSpin = () => {
  return (
    <div className="laoding-spin-cont">
      <MoonLoader color="#2e55e3" size={60} speedMultiplier={0.5} />
    </div>
  );
};
export default loadingPage;
