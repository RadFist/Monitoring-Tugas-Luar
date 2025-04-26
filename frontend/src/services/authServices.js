import { clearToken, getToken } from "../utils/tokenManpulation";

export const loginUser = async (username, password) => {
  const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;
  try {
    const response = await fetch(`${base_url}/Login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
      // if (response.status === 500) {
      //    throw new Error(
      //     "Terjadi kesalahan pada server. Silakan coba lagi nanti."
      //    );
      //   throw new Error(result.message);
      // } else {
      //   throw new Error("Username atau password salah.");
      //   throw new Error(result.message);
      // }
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;
  try {
    const response = await fetch(`${base_url}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    clearToken();
    return await response.json();
  } catch (error) {
    throw error;
  }
};

//refactor later
export const SignInUser = async (username, password, email) => {
  const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;
  try {
    const payload = {
      username: username,
      password: password,
      email: email,
    };

    const response = await fetch(`${base_url}/user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 500) {
        throw new Error(
          "Terjadi kesalahan pada server. Silakan coba lagi nanti."
        );
      } else {
        throw new Error(data.message);
      }
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const AddUser = async (username, password, email, level) => {
  const token = getToken();
  const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;
  try {
    const payload = {
      username: username,
      password: password,
      email: email,
      //refactor later
      level: level ? level : "user",
    };

    const response = await fetch(`${base_url}/user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 500) {
        throw new Error(
          "Terjadi kesalahan pada server. Silakan coba lagi nanti."
        );
      } else {
        throw new Error(data.message);
      }
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const authRefreshToken = async () => {
  const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;
  try {
    const response = await fetch(base_url + "/auth/referesh", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const { message } = await response.json().catch(() => ({}));
      throw new Error(message || "refresh failed");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
