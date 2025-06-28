import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/laporanDetail.css";
import api from "../services/api";
import AddIcon from "@mui/icons-material/Add";
import { ListRincianDana } from "../components/listManagement";
import { loadingCompSpin as Loading } from "../components/LoadingComp";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { SuccessModal } from "../components/modal";

export default function LaporanDetail() {
  const navigate = useNavigate();
  const [dataTugas, setDataTugas] = useState({});
  const [laporan, setLaporan] = useState({
    id_laporan: "",
    materi: "",
    bagian: "",
    laporan: "",
  });
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [rincianDana, setRincianDana] = useState([]);
  const [inputRincian, setInputRincian] = useState({
    deskripsi: "",
    jumlah: "",
  });
  const { idDetail } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get(`/laporan/${idDetail}`);
      const dana = await api.get(`/laporan/rincian/${idDetail}`);

      const dataResult = data.data.data;

      setDataTugas(dataResult.dataTugas[0]);

      if (dataResult.dataLaporan.length > 0) {
        setLaporan(dataResult.dataLaporan[0]);
        setDisabled(true);
        setHasValue(true);
      }
      setRincianDana(dana.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const button = e.nativeEvent.submitter;

    if (button.name == "edit") {
      return setDisabled(false);
    }

    const data = {
      id_laporan: laporan.id_laporan || "",
      idTugas: idDetail,
      bagian: laporan.bagian,
      materi: laporan.materi,
      laporan: laporan.laporan,
      judul_tugas: dataTugas.judul_tugas,
    };

    if (hasValue) {
      try {
        await api.patch(`/laporan/${idDetail}`, data);
        setDisabled(true);
        setModalActive(true);
      } catch (error) {
        alert("error try again latter");
      }
    } else {
      try {
        await api.post(`/laporan/${idDetail}`, data);
        setDisabled(true);
        setModalActive(true);
        const result = await api.get(`/laporan/${idDetail}`);
        const dataResult = result.data.data;
        setLaporan(dataResult.dataLaporan[0]);
        setHasValue(true);
      } catch (error) {
        alert(error);
      }
    }
  };

  const addingSubmit = async () => {
    await api.post("/laporan/rincian", {
      idTugas: idDetail,
      deskripsi: inputRincian.deskripsi,
      jumlah: inputRincian.jumlah,
    });

    const dana = await api.get(`/laporan/rincian/${idDetail}`);

    setRincianDana(dana.data.data);

    setInputRincian({
      deskripsi: "",
      jumlah: "",
    });
    setIsAdding(false);
  };

  const handlerDeleteRincian = async (id, e) => {
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

  const handlerChangeRincianDana = (e, id) => {
    const { value, name } = e.target;

    setRincianDana((prevRincian) =>
      prevRincian.map((item) =>
        item.id_rincian_dana == id ? { ...item, [name]: value } : item
      )
    );
  };

  const handlerSubmitEditRincian = async (item) => {
    console.log();

    try {
      await api.patch(`/laporan/rincian`, item);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerCloseModal = () => {
    setModalActive(false);
  };

  const handleInputChangeRincian = (e) => {
    const { name, value } = e.target;
    setInputRincian((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChangeLaporan = (e) => {
    const { name, value } = e.target;
    setLaporan((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="laporan-container">
      <SuccessModal
        displayModal={modalActive ? "active" : ""}
        onClose={handlerCloseModal}
      />
      <div className="header-laporan">
        <button onClick={() => navigate(-1)}>
          <ChevronLeftIcon /> Kembali
        </button>
        <h2 className="title-detail">Form Pelaporan Tugas Luar</h2>
      </div>
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
            value={laporan.materi}
            name="materi"
            disabled={disabled}
            onChange={handleInputChangeLaporan}
            placeholder="materi tentang apa"
            required
          ></input>
        </div>
        <div className="form-group">
          <label>Bagian Dari:</label>
          <input
            value={laporan.bagian}
            name="bagian"
            disabled={disabled}
            onChange={handleInputChangeLaporan}
            placeholder="e.x: Seksi pelayanan, seksi pemerintahan"
            required
          ></input>
        </div>

        <div className="form-group">
          <label>Laporan:</label>
          <textarea
            value={laporan.laporan}
            name="laporan"
            onChange={handleInputChangeLaporan}
            required
            disabled={disabled}
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
              onSubmit={handlerSubmitEditRincian}
              enabled={disabled}
            />
          )}
        </div>
        {isAdding && !loading && (
          <AddingRincian
            inputRincian={inputRincian}
            onChange={handleInputChangeRincian}
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
        {!isAdding && !loading && !disabled && (
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
          <button
            className={!disabled || !hasValue ? "btn-disabled" : ""}
            disabled={!disabled || !hasValue}
            onClick={(e) => {
              e.preventDefault();

              navigate(`/generate/pdf/laporan/${idDetail}`);
            }}
          >
            PDF Laporan
          </button>
          {!disabled && hasValue && (
            <button
              className="cencel-btn"
              onClick={(e) => {
                e.preventDefault();
                setDisabled(true);
              }}
            >
              Cencel
            </button>
          )}
          <button name={disabled ? "edit" : ""} type="submit">
            {disabled ? "Edit" : "Kirim Laporan"}
          </button>
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
