export const loginUser = async (username, password) => {
  const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;
  try {
    const response = await fetch(`${base_url}/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(response);
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

export const SignInUser = async (username, password, email, age) => {
  try {
    const payload = {
      username: username,
      password: password,
      email: email,
      age: age,
    };

    const response = await fetch("http://localhost:5000/Registration", {
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
