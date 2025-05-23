import "../style/Login.css";
import bgImage from "../assets/img/BackgroundLogin.jpg"; // Pastikan file ini ada di folder yang sesuai
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";
import LoginForm from "../components/Login/authForm";

export default function Login() {
  const [credential, setCredential] = useState({ Username: "", Password: "" });
  const [failedLogin, setFailedLogin] = useState("");
  const [Loading, setLoading] = useState("");
  const navigate = useNavigate();

  const handlerInput = (e) => {
    setCredential({ ...credential, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading("Loading..");

    try {
      await loginUser(credential.Username, credential.Password);
      navigate("/home");
    } catch (error) {
      setLoading("");
      const message = error.response.data.message;

      setFailedLogin({
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
            <h1 className="Login-Text">Login</h1>
          </div>
          <div className="CardBody">
            <LoginForm
              credential={credential}
              Loading={Loading}
              failedLogin={failedLogin}
              submit={handleSubmit}
              handlerInput={handlerInput}
            />
            <p>
              Don’t have an account?{" "}
              <a
                onClick={() => {
                  navigate("/SignIn");
                }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
