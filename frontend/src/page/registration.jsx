import "../style/Login.css";
import bgImage from "../assets/img/BackgroundLogin.jpg"; // Pastikan file ini ada di folder yang sesuai
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInUser } from "../services/authServices";
import { RegistForm } from "../components/Login/authForm";

export default function Login() {
  const [credential, setCredential] = useState({});
  const [failedSignIn, setFailedSignIn] = useState("");
  const [Loading, setLoading] = useState("");
  const navigate = useNavigate();

  const handlerInput = (e) => {
    setCredential({ ...credential, [e.target.id]: e.target.value });
  };

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
        credential.Email
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
      <img className="LoginBackground" src={bgImage} alt="Login background" />
      <div className="CardContainer">
        <div className="CardWraper">
          <div className="CardHeader">
            <h1 className="Login-Text">SignIn</h1>
          </div>
          <div className="CardBody">
            <RegistForm
              credential={credential}
              Loading={Loading}
              failedLogin={failedSignIn}
              submit={handleSubmit}
              handlerInput={handlerInput}
            />
            <p>
              have an account?{" "}
              <a
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
