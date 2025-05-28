import "../style/Login.css";
import bgImage from "../assets/img/bgAuth2.jpg";
import bgLoginCard from "../assets/img/bgLoginCard.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInUser } from "../services/authServices";
import { RegistForm } from "../components/Login/authForm";
import { plainApi } from "../services/api";
import { loadingCompSpin as LoadingSpin } from "../components/LoadingComp";

export default function Login() {
  const [credential, setCredential] = useState({});
  const [failedSignIn, setFailedSignIn] = useState("");
  const [Loading, setLoading] = useState("");
  const [LoadingPageRegist, setLoadingPageRegist] = useState(true);
  const [jabatanOptions, setJabatanOptions] = useState([]);
  const navigate = useNavigate();

  const handlerInput = (e) => {
    setCredential({ ...credential, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await plainApi.get("/Jabatan")).data;
        setJabatanOptions(response.data);
      } catch (error) {
        console.error("Error fetching :", error.message);
      } finally {
        setLoadingPageRegist(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading("Loading..");
    console.log(credential);

    try {
      await SignInUser(
        credential.Username,
        credential.Nama,
        credential.Nip,
        credential.Password,
        credential.Email,
        credential.Jabatan
      );
      navigate("/login");
    } catch (error) {
      setLoading("");
      const message = error.response.data.message;

      setFailedSignIn({
        class:
          message === "Internal Server Error, please try again later."
            ? ""
            : "error",
        message: message,
      });
    }
  };

  return (
    <div className="LoginContainer">
      <div className="bg-container">
        <img className="LoginBackground" src={bgImage} alt="Login background" />
      </div>
      <div className="CardContainer">
        <div className="CardWraperLeft">
          <img src={bgLoginCard} className="LoginBackgroundCard" />
          <img
            src="/img/logokab.png"
            className="logoBg"
            alt="Logo kab tangerang"
          />
          <div className="welcome-text">
            <h2>Buat Akun</h2>
            <p>Buat akun pegawai untuk mengakses</p>
          </div>
        </div>
        <div className="CardWraperRight">
          <div className="CardHeader">
            <h1
              style={{ marginBlockStart: "0.20em", marginBlockEnd: "0.20em" }}
              className="Login-Text"
            >
              SignIn
            </h1>
          </div>
          <div className="CardBody">
            {LoadingPageRegist == true ? (
              <LoadingSpin />
            ) : (
              <>
                <RegistForm
                  credential={credential}
                  Loading={Loading}
                  failedLogin={failedSignIn}
                  submit={handleSubmit}
                  handlerInput={handlerInput}
                  optionValue={jabatanOptions}
                />
                <p style={{ margin: "0px" }}>
                  have an account?{" "}
                  <a
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
