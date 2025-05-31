import { InfoOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import "../style/inputTugas.css";
import { useState } from "react";
import api, { plainApi } from "../services/api";
import { listItem as ListPegawai } from "../components/listManagement";

const InputTugas = () => {
  const [formData, setFormData] = useState({});
  const [listPegawaiOption, setListPegawaiOption] = useState([]);
  const [pegawai, setPegawai] = useState([]);
  const [jabatanOptions, setJabatanOptions] = useState([]);
  const [selectedJabatan, setSelectedJabatan] = useState("");
  // const [loading, setLoading] = useState(true);

  const initialFormState = {
    tugas: "",
    alamat: "",
    deskripsi: "",
    tanggalMulai: "",
    tanggalSelesai: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGetJabatan = (await plainApi.get("/Jabatan")).data;
        setJabatanOptions(responseGetJabatan.data);
      } catch (error) {
        console.error("Error fetching :", error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedJabatan) return;

    const fetchData = async () => {
      try {
        const responseGetUser = (
          await api.post("/users/jabatan", { id_jabatan: selectedJabatan })
        ).data;
        setListPegawaiOption(responseGetUser.data);
      } catch (error) {
        console.error("Error fetching :", error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [selectedJabatan]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (name === "pegawai" && value) {
      parsedValue = JSON.parse(value);
    }
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleChangeJabatan = (e) => {
    const { value } = e.target;
    setSelectedJabatan(value);
  };

  const handleAddPegawai = (e) => {
    e.preventDefault();
    if (!formData.pegawai) {
      alert("Pegawai belum dipilih!");
      return;
    }
    const alreadyAdded = pegawai.some((p) => p.id === formData.pegawai.id);
    if (alreadyAdded) {
      alert("Pegawai sudah ditambahkan.");
      return;
    }
    setPegawai((prev) => [...prev, formData.pegawai]);
  };

  const handlerDelete = (e, pegawai) => {
    e.preventDefault();
    setPegawai((prev) => prev.filter((p) => p.id !== pegawai.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pegawai.length < 1) {
      return alert("Tugaskan minimal 1 pegawai");
    }
    if (formData.tanggalMulai > formData.tanggalSelesai) {
      return alert("Tanggal tidak valid");
    }

    const yakin = window.confirm(
      "Apakah Anda yakin ingin menambahkan data ini?"
    );
    if (!yakin) return; // Jika user klik 'Batal', hentikan

    try {
      const responseGetJabatan = await api.post("/PenugasanTugasLuar", {
        namaTugas: formData.tugas,
        lokasi: formData.alamat,
        deskripsi: formData.deskripsi,
        tanggalMulai: formData.tanggalMulai,
        tanggalSelesai: formData.tanggalSelesai,
        daftarPegawai: pegawai,
      });

      setPegawai([]);
      setFormData(initialFormState);
      setJabatanOptions([]);
      setSelectedJabatan("");
    } catch (error) {}

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
          Tugas
          <input
            type="text"
            name="tugas"
            value={formData.tugas || ""}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Alamat
          <input
            type="text"
            name="alamat"
            value={formData.alamat || ""}
            onChange={handleInputChange}
            required
          />
        </label>

        <div className="date-row">
          <label>
            Tanggal Mulai
            <input
              type="date"
              name="tanggalMulai"
              value={formData.tanggalMulai || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Tanggal Selesai
            <input
              type="date"
              name="tanggalSelesai"
              value={formData.tanggalSelesai || ""}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="cont-penugasan-pegawai">
          <div className="pegawai-controls">
            <div className="pegawai-warp">
              <label htmlFor="pegawai">Pilih Jabatan Pegawai</label>
              <select
                name="Jabatan"
                id="Jabatan"
                onChange={handleChangeJabatan}
                className="select-pegawai"
              >
                <option value="">-- Pilih Jabtaan --</option>
                {jabatanOptions.map((item) => (
                  <option key={item.id_jabatan} value={item.id_jabatan}>
                    {item.jabatan}
                  </option>
                ))}
              </select>
            </div>
            {selectedJabatan && (
              <>
                <div className="pegawai-warp">
                  <label htmlFor="pegawai">Pilih Pegawai</label>
                  <select
                    name="pegawai"
                    id="pegawai"
                    onChange={handleInputChange}
                    className="select-pegawai"
                  >
                    <option value="">-- Pilih Pegawai --</option>
                    {listPegawaiOption.map((item) => (
                      <option
                        key={item.id_user}
                        value={JSON.stringify({
                          id: item.id_user,
                          nama: item.nama,
                          nip: item.nip,
                        })}
                      >
                        {item.nama} {item.nip}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          {selectedJabatan && (
            <>
              <button
                type="button"
                onClick={handleAddPegawai}
                className="add-btn-pegawai"
              >
                Tambahkan ke Daftar
              </button>
            </>
          )}
        </div>
        {pegawai.length > 0 && (
          <ListPegawai list={pegawai} onDelete={handlerDelete} />
        )}
        <label>
          Deskripsi
          <textarea
            name="deskripsi"
            rows="4"
            value={formData.deskripsi || ""}
            onChange={handleInputChange}
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
