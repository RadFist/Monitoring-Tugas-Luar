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
import GoogleMaps from "../components/google";
import { useNavigate, useParams } from "react-router-dom";

const InputTugas = () => {
  const [formData, setFormData] = useState({});
  const [listPegawaiOption, setListPegawaiOption] = useState([]);
  const [pegawai, setPegawai] = useState([]);
  const [jabatanOptions, setJabatanOptions] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [displayMap, setDisplayMap] = useState(false);
  const [selectedJabatan, setSelectedJabatan] = useState("");
  const [map, setMap] = useState("");
  const [loading, setLoading] = useState(true);
  const [valueTime, setValueTime] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

        //mode edit
        if (id) {
          const responses = await api.get(`/tugas/edit/${id}`);
          const data = responses.data.data;

          setFormData({
            tugas: data.judul_tugas || "",
            alamat: data.alamat || "",
            lokasi: data.lokasi || "",
            dasar: data.dasar || "",
            perihal: data.perihal || "",
            deskripsi: data.deskripsi || "",
            tanggalMulai: data.tanggal_mulai || "",
            tanggalSelesai: data.tanggal_selesai || "",
            waktuMulai: data.jam || "",
            tingkat_biaya: data.tingkat_biaya || "",
            kendaraan: data.kendaraan || "",
          });
          if (data.jam) {
            const [hours, minutes] = data.jam.split(":");
            const dateObj = new Date();
            dateObj.setHours(parseInt(hours), parseInt(minutes), 0);
            setValueTime(dateObj);
          }
          setPegawai(data.pegawai);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // kalau backend kirim 404
          navigate(`/notFound`);
        }
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
    console.log(formData.pegawai);
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

    if (id) {
      try {
        await api.put("/PenugasanTugasLuar", {
          namaTugas: formData.tugas,
          lokasi: formData.lokasi,
          alamat: formData.alamat,
          dasar: formData.dasar,
          perihal: formData.perihal,
          deskripsi: formData.deskripsi,
          kendaraan: formData.kendaraan,
          tingkat_biaya: formData.tingkat_biaya,
          tanggalMulai: `${formData.tanggalMulai}T${formData.waktuMulai}:00`,
          tanggalSelesai: formData.tanggalSelesai,
          daftarPegawai: pegawai,
          tugas_id: id,
        });
        setModalActive(true);
        navigate(`/Tugas-Luar/Detail-Penugasan/${id}`);
      } catch (error) {}
    } else {
      try {
        await api.post("/PenugasanTugasLuar", {
          namaTugas: formData.tugas,
          lokasi: formData.lokasi,
          alamat: formData.alamat,
          dasar: formData.dasar,
          perihal: formData.perihal,
          deskripsi: formData.deskripsi,
          kendaraan: formData.kendaraan,
          tingkat_biaya: formData.tingkat_biaya,
          tanggalMulai: `${formData.tanggalMulai}T${formData.waktuMulai}:00`,
          tanggalSelesai: formData.tanggalSelesai,
          daftarPegawai: pegawai,
        });

        setPegawai([]);
        setFormData(initialFormState);
        setSelectedJabatan("");
        setValueTime("");
        setModalActive(true);
      } catch (error) {
        alert("error saat melakukan post " + error);
      }
    }
  };

  const handlerCloseModal = () => {
    setModalActive(false);
  };

  const handlerMap = (e) => {
    e.preventDefault();
    setMap(formData.alamat);
    setDisplayMap(true);
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

          <div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <label style={{ flex: 1 }}>
                Alamat
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat || ""}
                  placeholder="ex: jln abc kab efg"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label style={{ flex: 1 }}>
                Lokasi
                <input
                  type="text"
                  name="lokasi"
                  value={formData.lokasi || ""}
                  placeholder="ex: gedung abc dixyz"
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <GoogleMaps locationParam={map || ""} display={displayMap}>
              <button className="btn-tampil-map" onClick={(e) => handlerMap(e)}>
                tampilkan map
              </button>
            </GoogleMaps>
          </div>

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
          </div>

          <label>
            Tingkat Biaya
            <select
              className="select-pegawai"
              name="tingkat_biaya"
              value={formData.tingkat_biaya || ""}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled hidden>
                Pilih tingkat biaya
              </option>
              <option value="Dalam Daerah">Dalam Daerah</option>
              <option value="Luar Daerah">Luar Daerah</option>
            </select>
          </label>

          <label>
            Kendaraan
            <select
              className="select-pegawai"
              name="kendaraan"
              value={formData.kendaraan || ""}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled hidden>
                Pilih kendaraan
              </option>
              <option value="Mobil Dinas">Mobil Dinas</option>
              <option value="Motor Dinas">Motor Dinas</option>
              <option value="Kendaraan Pribadi">Kendaraan Pribadi</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </label>

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
            {id ? "Edit Tugas" : "Simpan Tugas"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputTugas;
