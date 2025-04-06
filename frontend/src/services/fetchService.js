const fetchService = async (url) => {
  const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;
  try {
    const response = await fetch(base_url + url);
    return response.message;
  } catch (error) {
    throw error;
  }
};

export default fetchService;
