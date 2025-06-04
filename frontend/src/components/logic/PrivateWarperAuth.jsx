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
import { jwtDecode } from "jwt-decode";

export const PrivateWraper = ({ children, allowedLevels = [] }) => {
  const [isAuth, setIsAuth] = useState(null);
  const token = getToken();
  const level = jwtDecode(token).level;

  useEffect(() => {
    const checkAuth = async () => {
      if (!isTokenValid(token)) {
        try {
          console.log(isTokenValid(token));

          const data = await authRefreshToken();
          saveToken(data.token);
          //refactor later or delete
        } catch (error) {
          clearToken();
          setIsAuth(false);
          console.log(error);
          throw error;
        }
      } else {
        setIsAuth(true);
      }
    };

    checkAuth();
  }, []);

  if (allowedLevels.length >= 1 && !allowedLevels.includes(level)) {
    return <Navigate to="/not-found" />;
  }

  if (isAuth === null) return <LoadingPage />;

  if (isAuth === false) return <Navigate to="/login" />;

  return children;
};
