import { Navigate } from "react-router-dom";
import {
  clearToken,
  getToken,
  saveToken,
  checkTokenExp as isTokenValid,
} from "../../utils/tokenManpulation";
import { useEffect, useState } from "react";
import { authRefreshToken } from "../../services/authServices";

// const isTokenValid = (token) => {
//   if (!token) return false;

//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     const currentTime = Math.floor(Date.now() / 1000);
//     return payload.exp > currentTime;
//   } catch (error) {
//     return false;
//   }
// };

// fixed later
export const privateWraper = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  // const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;

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

  if (isAuth === null) return <div>Loading...</div>;

  if (isAuth === false) return <Navigate to="/login" />;

  return children;
};

export default privateWraper;
