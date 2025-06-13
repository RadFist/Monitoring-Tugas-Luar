// socket.js
import { io } from "socket.io-client";
const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;

// Ganti URL sesuai server kamu
const socket = io(base_url, {
  withCredentials: true,
});

export default socket;
