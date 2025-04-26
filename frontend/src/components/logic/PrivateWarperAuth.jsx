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

export const PrivateWraper = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const token = getToken();

  useEffect(() => {
    const checkAuth = async () => {
      const tokenCond = isTokenValid(token);
      if (!tokenCond) {
        try {
          const data = await authRefreshToken();
          saveToken(data.token);
          console.log("token refereshed in privateWraper " + getToken());
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

export const chekAuthToken = async (tokenParam, navigate) => {
  if (!isTokenValid(tokenParam)) {
    try {
      const data = await authRefreshToken();
      saveToken(data.token);
      return getToken();
    } catch (error) {
      clearToken();
      navigate("/login");
      throw error;
    }
  }
  return tokenParam;
};
