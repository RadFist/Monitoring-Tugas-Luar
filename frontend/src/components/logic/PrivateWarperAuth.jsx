import { Navigate } from "react-router-dom";
import {
  clearToken,
  getToken,
  saveToken,
  checkTokenExp as isTokenValid,
} from "../../utils/tokenManpulation";
import { useEffect, useState } from "react";
import { authRefreshToken } from "../../services/authServices";
import LoadingPage from "../LoadingComp";

const PrivateWraper = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!isTokenValid(token)) {
        try {
          const data = await authRefreshToken();
          saveToken(data.token);
          console.log("token di wrap " + getToken());
          setIsAuth(true);
        } catch (error) {
          clearToken();
          setIsAuth(false);

          throw error;
        }
      } else {
        setIsAuth(true);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return <LoadingPage />;

  if (isAuth === false) return <Navigate to="/login" />;

  return children;
};

export default PrivateWraper;
