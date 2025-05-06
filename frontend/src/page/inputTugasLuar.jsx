import { InfoOutlined } from "@mui/icons-material";
import "../style/inputTugas.css";
import { useState } from "react";

const InputTugas = () => {
  const [formData, setFormData] = useState({
    namaPegawai: "",
    tugas: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    keterangan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data tugas:", formData);
    // TODO: kirim ke backend pakai API
    alert("Tugas berhasil disimpan!");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Input Tugas</h2>
        <p className="page-subtitle">
          <InfoOutlined className="info-icon" />
          Silakan isi data tugas di bawah ini
        </p>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Nama Pegawai
          <input
            type="text"
            name="namaPegawai"
            value={formData.namaPegawai}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Tugas
          <input
            type="text"
            name="tugas"
            value={formData.tugas}
            onChange={handleChange}
            required
          />
        </label>

        <div className="date-row">
          <label>
            Tanggal Mulai
            <input
              type="date"
              name="tanggalMulai"
              value={formData.tanggalMulai}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Tanggal Selesai
            <input
              type="date"
              name="tanggalSelesai"
              value={formData.tanggalSelesai}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label>
          Keterangan
          <textarea
            name="keterangan"
            rows="4"
            value={formData.keterangan}
            onChange={handleChange}
          ></textarea>
        </label>

        <button type="submit" className="submit-btn">
          Simpan Tugas
        </button>
      </form>
    </div>
  );
};

export default InputTugas;
