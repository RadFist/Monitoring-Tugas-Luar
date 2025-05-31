import "../style/review.css";

// TugasForm.jsx
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const TugasForm = () => {
  const [pegawai, setPegawai] = useState("");
  const [daftarPegawai, setDaftarPegawai] = useState([]);

  const handleTambahPegawai = () => {
    if (!pegawai || daftarPegawai.includes(pegawai)) return;
    setDaftarPegawai([...daftarPegawai, pegawai]);
    setPegawai("");
  };

  const handleHapus = (nip) => {
    setDaftarPegawai(daftarPegawai.filter((p) => p !== nip));
  };

  return (
    <div className="form-container">
      <h2>Silakan isi data tugas di bawah ini</h2>

      <label>Tugas</label>
      <input
        type="text"
        className="input"
        placeholder="Contoh: Rapat Koordinasi"
      />

      <label>Alamat</label>
      <input
        type="text"
        className="input"
        placeholder="Contoh: Jl. Sukadiri No. 10"
      />

      <div className="date-row">
        <div>
          <label>Tanggal Mulai</label>
          <input type="date" className="input" />
        </div>
        <div>
          <label>Tanggal Selesai</label>
          <input type="date" className="input" />
        </div>
      </div>

      <label>Pilih Jabatan Pegawai</label>
      <select className="input">
        <option>Camat</option>
        <option>Sekretaris</option>
        <option>Staf</option>
      </select>

      <label>Pilih Pegawai</label>
      <input
        type="text"
        className="input"
        value={pegawai}
        onChange={(e) => setPegawai(e.target.value)}
        placeholder="Contoh: Muhammad Rifansyah Aliyilbuni - 3457684837"
      />

      <button className="btn" onClick={handleTambahPegawai}>
        Tambahkan ke Daftar
      </button>

      <h4>Daftar Pegawai yang Ditambahkan:</h4>
      {daftarPegawai.map((p, idx) => (
        <div className="pegawai-item" key={idx}>
          {p}
          <button className="delete-btn" onClick={() => handleHapus(p)}>
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      ))}

      <label>Keterangan</label>
      <textarea
        className="input"
        rows="3"
        placeholder="Contoh: Tugas luar untuk rapat koordinasi dengan kecamatan tetangga."
      />
    </div>
  );
};

export default TugasForm;
