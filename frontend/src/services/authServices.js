export const loginUser = async (username, password) => {
  try {
    const response = await fetch("http://localhost:5000/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      if (response.status === 500) {
        throw new Error(
          "Terjadi kesalahan pada server. Silakan coba lagi nanti."
        );
      } else {
        throw new Error("Username atau password salah.");
      }
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const SignInUser = async (username, password, email, age) => {
  console.log("adnjnsadj");
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
