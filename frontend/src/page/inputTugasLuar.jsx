import { InfoOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import "../style/inputTugas.css";
import { useState } from "react";
import api, { plainApi } from "../services/api";
import { ListItem as ListPegawai } from "../components/listManagement";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { HeaderSecond } from "../layout/headerSecond";
import { SuccessModal } from "../components/modal";

const InputTugas = () => {
  const [formData, setFormData] = useState({});
  const [listPegawaiOption, setListPegawaiOption] = useState([]);
  const [pegawai, setPegawai] = useState([]);
  const [jabatanOptions, setJabatanOptions] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [selectedJabatan, setSelectedJabatan] = useState("");
  const [loading, setLoading] = useState(true);
  const [valueTime, setValueTime] = useState(null);

  const initialFormState = {
    tugas: "",
    alamat: "",
    dasar: "",
    perihal: "",
    deskripsi: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    waktuMulai: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGetJabatan = (await plainApi.get("/Jabatan")).data;
        setJabatanOptions(responseGetJabatan.data);
      } catch (error) {
        console.error("Error fetching :", error.message);
      } finally {
        setLoading(false);
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

  const handleTimeChange = (newTime) => {
    if (newTime) {
      const date = newTime.toDate();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;

      setFormData((prev) => ({
        ...prev,
        waktuMulai: formattedTime,
      }));
      setValueTime(newTime);
    }
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

  const handlerDelete = (pegawai) => {
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
      await api.post("/PenugasanTugasLuar", {
        namaTugas: formData.tugas,
        lokasi: formData.lokasi,
        dasar: formData.dasar,
        perihal: formData.perihal,
        deskripsi: formData.deskripsi,
        tanggalMulai: `${formData.tanggalMulai}T${formData.waktuMulai}:00`,
        tanggalSelesai: formData.tanggalSelesai,
        daftarPegawai: pegawai,
      });

      setPegawai([]);
      setFormData(initialFormState);
      setSelectedJabatan("");
      setValueTime("");
    } catch (error) {}

    setModalActive(true);
  };

  const handlerCloseModal = () => {
    setModalActive(false);
  };

  if (loading) {
    return (
      <div className="content-penugasan-loading">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <HeaderSecond text="Penugasan Pegawai"></HeaderSecond>
      <SuccessModal
        displayModal={modalActive ? "active" : ""}
        onClose={handlerCloseModal}
      >
        <h2>Success!</h2>
        <p>Data tugas berhasil ditambahkan</p>
      </SuccessModal>
      <div className="page-container">
        <div className="page-header">
          <h2>Input Tugas </h2>
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
              placeholder="ex: Rapat kordinasi di abc"
              value={formData.tugas || ""}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Dasar
            <input
              type="text"
              name="dasar"
              placeholder="ex: Surat dari dinas Abc"
              value={formData.dasar || ""}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Perihal
            <input
              type="text"
              name="perihal"
              placeholder="ex: undangan rapat abc xyz"
              value={formData.perihal || ""}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            lokasi
            <input
              type="text"
              name="lokasi"
              value={formData.lokasi || ""}
              placeholder="ex: gedung abc dixyz"
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
              <label className="waktu-label-input">
                waktu Mulai
                <DatePicker
                  disableDayPicker
                  format="HH:mm"
                  plugins={[<TimePicker />]}
                  value={valueTime}
                  onChange={handleTimeChange}
                  editable={false}
                  required
                />
              </label>
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
    </div>
  );
};

export default InputTugas;
