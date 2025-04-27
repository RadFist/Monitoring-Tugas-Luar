import axios from "axios";
import { getToken, clearToken } from "../utils/tokenManpulation";
import { authRefreshToken } from "./authServices";
import { saveToken } from "../utils/tokenManpulation";

const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;

const api = axios.create({
  baseURL: base_url,
  withCredentials: true, // buat ngirim cookie kayak refreshToken
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Inject token sebelum request
api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newTokenData = await authRefreshToken(); // panggil API refresh
        const newToken = newTokenData.token;
        saveToken(newToken); // update token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // retry request yang gagal
      } catch (refreshError) {
        console.log("sadasd");

        clearToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
