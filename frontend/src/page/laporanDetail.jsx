import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/laporanDetail.css";
import api from "../services/api";
import AddIcon from "@mui/icons-material/Add";
import { ListRincianDana } from "../components/listManagement";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

export default function LaporanDetail() {
  const navigate = useNavigate();
  const [dataTugas, setDataTugas] = useState({});
  const [deskripsi, setDeskripsi] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [inputRincian, setInputRincian] = useState({
    text: "",
    dana: "",
  });
  const [rincianDana, setRincianDana] = useState([
    { id: 12, text: "learn HTML", dana: 10000 },
    { id: 1122, text: "learn JS", dana: 10000 },
    { id: 323, text: "learn CSS", dana: 10000 },
    { id: 1121, text: "learn REACT", dana: 10000 },
  ]);
  const [file, setFile] = useState(null);
  const { idDetail } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get(`/tugas/detail/${idDetail}`);

      setDataTugas(data.data.data);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(dataTugas);
  // }, [dataTugas]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi pengiriman data
    const formData = new FormData();
    formData.append("deskripsi", deskripsi);
    formData.append("rincian_dana", rincianDana);
    formData.append("file", file);

    console.log("Form submitted:", {
      deskripsi,
      rincianDana,
      file,
    });

    alert("Laporan berhasil dikirim!");

    // Reset form
    setDeskripsi("");
    setRincianDana("");
    setFile(null);
  };

  // const laporan = {
  //   nama_pegawai: "Budi Santoso",
  //   nip: "19801212 200112 1 001",
  //   jabatan: "Staff Pelayanan Umum",
  //   tanggal: "2025-06-13",
  //   tujuan: "Kantor Bupati Tangerang",
  //   status: "Disetujui",
  // };

  const addingSubmit = () => {
    setRincianDana((prev) => [
      ...prev,
      {
        id: 12222,
        text: inputRincian.text,
        dana: inputRincian.dana,
      },
    ]);

    setInputRincian({
      text: "",
      dana: "",
    });
    setIsAdding(false);
  };

  const handlerDeleteRincian = (id) => {
    setRincianDana((prevRincian) => {
      const updated = prevRincian.filter((item) => item.id !== id);
      return updated;
    });
  };

  const handlerChangeRincianDana = (newText, key) => {
    setRincianDana((prevRincian) => {
      return prevRincian.map((item) => {
        if (item.id === newText.id) {
          return {
            ...item,
            [key]: newText[key], // contoh perubahan
          };
        }
        return item;
      });
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputRincian((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="laporan-container">
      <h2>Form Pelaporan Tugas Luar</h2>
      <div className="laporan-detail">
        <p>
          <strong>Tugas:</strong> {dataTugas.judul_tugas}
        </p>

        <p>
          <strong>Lokasi:</strong> {dataTugas.lokasi}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="laporan-form">
        <div className="form-group">
          <label>Materi:</label>
          <input
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="materi tentang apa"
            required
          ></input>
        </div>
        <div className="form-group">
          <label>Dari:</label>
          <input
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="e.x: Seksi pelayanan"
            required
          ></input>
        </div>
        <div className="form-group">
          <label>Upload Foto / Dokumen </label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
          />
          {file && <p>File: {file.name}</p>}
        </div>
        <div className="form-group">
          <label>Laporan:</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
            rows={4}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Rincian Dana :</label>
          <ListRincianDana
            list={rincianDana}
            onChange={handlerChangeRincianDana}
            onDelete={handlerDeleteRincian}
          />
        </div>
        {isAdding && (
          <AddingRincian
            inputRincian={inputRincian}
            onChange={handleInputChange}
            addingSubmit={addingSubmit}
            setFalse={() => {
              setInputRincian({
                text: "",
                dana: "",
              });
              setIsAdding(false);
            }}
          />
        )}
        {!isAdding && (
          <div className="cont-btn-rinci">
            <button
              className="btn-rinci-dana"
              onClick={(e) => {
                e.preventDefault();
                setIsAdding(true);
              }}
            >
              <AddIcon />
            </button>
          </div>
        )}

        <div className="laporan-actions">
          <button type="button" onClick={() => navigate(-1)}>
            Kembali
          </button>
          <button type="submit">Kirim Laporan</button>
        </div>
      </form>
    </div>
  );
}

const AddingRincian = ({ inputRincian, onChange, addingSubmit, setFalse }) => {
  return (
    <>
      <div className="list-pegawai-container">
        <ul className="pegawai-list">
          <div className="rincian-dana-items">
            <input
              type="text"
              name="text"
              value={inputRincian.text}
              onChange={onChange}
            />
            :
            <input
              type="number"
              name="dana"
              value={inputRincian.dana}
              onChange={onChange}
              min={1}
              onKeyDown={(e) => {
                // izinkan navigasi, backspace, delete, tab, dll.
                const allowedKeys = [
                  "Backspace",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                  "Delete",
                ];
                if (
                  !/^\d$/.test(e.key) && // jika bukan angka 0-9
                  !allowedKeys.includes(e.key)
                ) {
                  e.preventDefault(); // blok karakter selain angka
                }
              }}
            />
            <div className="cont-btn-action-rinci">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addingSubmit();
                }}
              >
                <SaveIcon />
              </button>
              <button
                className="btn-delete-rinci"
                onClick={(e) => {
                  e.preventDefault();
                  setFalse();
                }}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
};
