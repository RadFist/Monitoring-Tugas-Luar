import "../style/profile.css";
import { useState } from "react";
import { getToken } from "../utils/tokenManpulation";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

const Profile = () => {
  const token = getToken();
  const payload = token ? jwtDecode(token) : "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      setMessage("Password minimal 8 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Password dan konfirmasi tidak cocok.");
      return;
    }

    const confirmChange = window.confirm(
      "Apakah Anda yakin ingin mengubah password?"
    );
    if (!confirmChange) {
      return;
    }
    // Simulasi kirim ke server
    try {
      const res = await api.patch(`/user/changePassword/${payload.id_user}`, {
        Password: newPassword,
      });

      alert(res.data.message);
    } catch (error) {
      if (error.response) {
        // kalau error dari backend (misalnya 404, 500)
        alert(error.response.data.message);
      } else {
        // kalau error dari jaringan/axios
        console.log(error);

        alert("Something went wrong");
      }
    }

    setMessage("Password berhasil diperbarui.");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="profile-container">
      <h2>Profil Pengguna</h2>
      <div className="profile-card">
        <div className="profile-row">
          <span className="label">Nama:</span>
          <span>{payload.nama}</span>
        </div>
        <div className="profile-row">
          <span className="label">Email:</span>
          <span>{payload.email}</span>
        </div>
        <div className="profile-row">
          <span className="label">NIP:</span>
          <span>{payload.nip}</span>
        </div>
        <div className="profile-row">
          <span className="label">Jabatan:</span>
          <span>{payload.jabatan}</span>
        </div>
        <div className="profile-row">
          <span className="label">Level:</span>
          <span>{payload.level}</span>
        </div>
        <div className="profile-row">
          <span className="label">Username:</span>
          <span>{payload.username}</span>
        </div>
      </div>

      <h3 style={{ marginTop: "30px" }}>Ubah Password</h3>
      <form onSubmit={handlePasswordChange} className="password-form">
        <div className="form-group">
          <label>Password Baru</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Masukkan password baru"
          />
        </div>
        <div className="form-group">
          <label>Konfirmasi Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Konfirmasi password baru"
          />
        </div>

        <button
          type="submit"
          className={`btn-simpan-password`}
          disabled={newPassword === "" || confirmPassword === ""}
        >
          Simpan Password
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Profile;
