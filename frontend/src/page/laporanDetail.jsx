import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/laporanDetail.css";
import api from "../services/api";
import AddIcon from "@mui/icons-material/Add";
import { ListRincianDana } from "../components/listManagement";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function LaporanDetail() {
  const navigate = useNavigate();
  const [dataTugas, setDataTugas] = useState({});
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [rincianDana, setRincianDana] = useState([]);
  const [inputRincian, setInputRincian] = useState({
    deskripsi: "",
    jumlah: "",
  });
  const { idDetail } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get(`/tugas/detail/${idDetail}`);
      const foto = await api.get(`/documentation/${idDetail}`);
      const dana = await api.get(`/laporan/rincian/${idDetail}`);
      setImageUrl(foto.data.data);
      setDataTugas(data.data.data);
      setRincianDana(dana.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    const formData = new FormData();
    formData.append("foto", selectedFile);
    formData.append("id", idDetail);
    try {
      const res = await axios.post(
        "http://localhost:8080/documentation",
        formData,
        {
          withCredentials: true, // jika perlu kirim cookie
        }
      );
      const newImagePath = res.data.filePath;
      setImageUrl((prev) => [...prev, { file_url: newImagePath }]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addingSubmit = async () => {
    await api.post("/laporan/rincian", {
      idTugas: idDetail,
      deskripsi: inputRincian.deskripsi,
      jumlah: inputRincian.jumlah,
    });

    setRincianDana((prev) => [
      ...prev,
      {
        id: 12222,
        deskripsi: inputRincian.deskripsi,
        jumlah: inputRincian.jumlah,
      },
    ]);

    setInputRincian({
      text: "",
      jumlah: "",
    });
    setIsAdding(false);
  };

  const handlerDeleteRincian = async (id) => {
    try {
      await api.delete("/laporan/rincian", {
        data: {
          idTugas: idDetail,
          idRincian: id,
        },
      });
      setRincianDana((prevRincian) => {
        const updated = prevRincian.filter(
          (item) => item.id_rincian_dana !== id
        );
        return updated;
      });
    } catch (error) {
      console.error("Gagal menghapus rincian:", error);
      alert("Terjadi kesalahan saat menghapus rincian.");
    }
  };
  const handlerDeleteFoto = (path) => {
    const pathname = path.file_url;
    api.delete("/documentation", {
      data: {
        idTugas: idDetail,
        pathName: pathname,
      },
    });
    setImageUrl((prev) => {
      const updated = prev.filter((item) => item.file_url != pathname);
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
          <label>Bagian Dari:</label>
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
        </div>
        <div className="image-preview-container">
          {loading && <Loading></Loading>}
          {imageUrl && (
            <>
              {imageUrl.map((value, index) => (
                <div key={index} className="warp-img-prev">
                  <img src={value.file_url} alt="Gambar hasil upload" />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handlerDeleteFoto(value);
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </>
          )}
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
          {(loading && <Loading></Loading>) || (
            <ListRincianDana
              list={rincianDana}
              onChange={handlerChangeRincianDana}
              onDelete={handlerDeleteRincian}
            />
          )}
        </div>
        {isAdding && !loading && (
          <AddingRincian
            inputRincian={inputRincian}
            onChange={handleInputChange}
            addingSubmit={addingSubmit}
            setFalse={() => {
              setInputRincian({
                text: "",
                jumlah: "",
              });
              setIsAdding(false);
            }}
          />
        )}
        {!isAdding && !loading && (
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
            <label>
              Deskripsi
              <input
                type="text"
                name="deskripsi"
                value={inputRincian.deskripsi}
                onChange={onChange}
              />
            </label>
            :
            <label>
              Harga
              <input
                type="number"
                name="jumlah"
                value={inputRincian.jumlah}
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
            </label>
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
