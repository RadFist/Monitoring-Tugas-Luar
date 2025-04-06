const fetchService = async (url, token) => {
  const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;
  try {
    const response = await fetch(base_url + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default fetchService;
