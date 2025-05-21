import { clearToken, saveToken } from "../utils/tokenManpulation";
import api from "./api";

export const loginUser = async (username, password) => {
  const response = await api.post("/Login", { username, password });
  saveToken(response.data.accessToken);
};

export const logoutUser = async () => {
  await api.post("/auth/logout");
  clearToken();
};

export const SignInUser = async (username, nama, nip, password, email) => {
  const response = await api.post("/regist", {
    username,
    nama,
    nip,
    password,
    email,
  });
  return response.data;
};

export const AddUser = async (
  username,
  nama,
  password,
  email,
  nip,
  level = "user"
) => {
  const response = await api.post("/user/add", {
    username,
    nama,
    password,
    email,
    nip,
    level,
  });
  return response.data;
};

export const authRefreshToken = async () => {
  const response = await api.post("/auth/referesh");
  return response.data;
};
