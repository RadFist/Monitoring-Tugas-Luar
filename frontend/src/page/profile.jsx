import "../style/profile.css";
import { useState } from "react";
import { getToken } from "../utils/tokenManpulation";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const token = getToken();
  const payload = token ? jwtDecode(token) : "";

  const user = {
    nama: "Budiono Siregar",
    email: "KapalLawd@gmail.com",
    nip: "23434893480939",
    jabatan: "Subbag Umum dan Kepegawaian",
    level: "Pegawai",
    username: "user1",
  };

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setMessage("Password tidak boleh kosong.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Password dan konfirmasi tidak cocok.");
      return;
    }

    // Simulasi kirim ke server
    console.log("Password baru:", newPassword);
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
        <button type="submit" className="btn-simpan-password">
          Simpan Password
        </button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Profile;
