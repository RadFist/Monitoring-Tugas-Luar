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
      if (!isTokenValid(token)) {
        try {
          console.log(isTokenValid(token));

          const data = await authRefreshToken();
          saveToken(data.token);
          //refactor later or delete
          console.log({
            page: "privateWraper",
            token: getToken(),
            message: "refresed token on wraper",
          });

          setIsAuth(true);
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

  if (isAuth === null) return <LoadingPage />;

  if (isAuth === false) return <Navigate to="/login" />;

  return children;
};
