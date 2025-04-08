export const saveToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const clearToken = () => localStorage.removeItem("token");
export const checkTokenExp = (token) => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
};
