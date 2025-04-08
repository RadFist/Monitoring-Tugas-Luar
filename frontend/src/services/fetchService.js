const fetchService = async (url, token) => {
  const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;
  try {
    const response = await fetch(base_url + url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status >= 400 && response.status < 500) {
      throw new Error("token expired");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default fetchService;
