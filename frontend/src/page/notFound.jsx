import "../style/not-found.css";
const notFound = () => {
  return (
    <div className="not-found-page-cont">
      <div className="not-found-logo-wrap">
        <img src="/img/logo.png" alt="Logo kab tangerang" />
        <div>
          <span>PAGE NOT</span>
          <span>FOUND</span>
        </div>
      </div>
    </div>
  );
};

export default notFound;
