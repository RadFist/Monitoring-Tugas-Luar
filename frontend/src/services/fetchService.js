const postService = async (url, token) => {
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
    //refactor lqter
    if (response.status >= 400 && response.status < 500) {
      throw new Error("token expired");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
export const getService = async (url, token) => {
  const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;
  try {
    const response = await fetch(`${base_url}${url}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Kalau response gagal (status 4xx atau 5xx)
      const errorData = await response.json().catch(() => ({})); // Kalau response tidak ada body, hindari error
      const message = errorData.message || `HTTP error ${response.status}`;

      // Deteksi khusus kalau token expired
      if (response.status === 401 || response.status === 403) {
        throw new Error("token expired");
      }

      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
export const deleteService = async (url, token) => {
  const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;
  try {
    const response = await fetch(base_url + url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    //refactor lqter
    if (response.status >= 400 && response.status < 500) {
      throw new Error("token expired");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default postService;
