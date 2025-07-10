import { useLocation, useNavigate } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import "../style/listTugas.css";
import { HeaderSecond } from "../layout/headerSecond";
import { useState } from "react";
import { useEffect } from "react";
import { FormControl, TextField } from "@mui/material";
import api from "../services/api";
import { loadingCompSpin as LoadingSpin } from "../components/LoadingComp";

export const ArsipDokumen = () => {
  const [dataAsli, setDataAsli] = useState([]);
  const [daftarDokumen, setDaftarDokumen] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const filterDate = query.get("dateFilter");
  const [filter, setFilter] = useState({ date: filterDate });
  const [searchTugas, setSearchTugas] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let queryFilter = "";
    let date = "";
    if (filter.date) {
      queryFilter = `?date=${filter.date}`;
      date = "?dateFilter=" + filter.date;
    }
    const fetchData = async () => {
      try {
        const response = await api.get(`/arsip${queryFilter}`);
        setDaftarDokumen(response.data.data);
        setDataAsli(response.data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // navigate(date);
  }, [filter]);

  useEffect(() => {
    if (searchTugas.trim() === "") {
      setDaftarDokumen(dataAsli);
    } else {
      const filtered = dataAsli.filter((item) =>
        item.judul_tugas.toLowerCase().includes(searchTugas.toLowerCase())
      );
      setDaftarDokumen(filtered);
    }
  }, [searchTugas, dataAsli]);

  const handlerClickDetail = (id) => {
    navigate(`/arsip/dokumen/${id}`);
  };

  if (loading) {
    return (
      <div style={{ height: "80vh" }}>
        <LoadingSpin />;
      </div>
    );
  }

  return (
    <div>
      <HeaderSecond text="Arsip Dokumen">
        <FormControl size="small" style={{ marginRight: "20px" }}>
          <p className="filterLabel">Cari Tugas:</p>
          <TextField
            className="search-archive"
            placeholder="cari tugas 🔎"
            size="small"
            type="text"
            value={searchTugas || ""}
            onChange={(e) => setSearchTugas(e.target.value)}
          />
        </FormControl>
        <FormControl size="small" style={{ marginRight: "20px" }}>
          <p className="filterLabel">Tanggal:</p>
          <TextField
            size="small"
            type="date"
            value={filter.date || ""}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </FormControl>
      </HeaderSecond>

      <div className="content-list-tugas">
        <div className="list-arsip">
          {daftarDokumen.length === 0 ? (
            <p style={{ textAlign: "center" }} className="no-tugas-message">
              Arsip Kosong
            </p>
          ) : (
            daftarDokumen.map((item) => (
              <div className="arsip-item" key={item.id_tugas_luar}>
                <div className="arsip-header">
                  <h3>{item.judul_tugas}</h3>
                </div>
                <div>
                  <img src="/img/pdf.png" style={{ width: "250px" }} />
                </div>
                <div className="arsip-body-card">
                  <p>
                    <strong>lokasi:</strong> {item.lokasi}
                  </p>
                  <p>
                    <strong>tanggal:</strong> {item.tanggal_mulai}
                  </p>
                </div>
                <button
                  className="detail-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handlerClickDetail(item.id_tugas_luar);
                  }}
                >
                  Dokumen Tugas{" "}
                  <DescriptionIcon
                    style={{ marginLeft: "3px" }}
                    sx={{ fontSize: 16 }}
                  />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArsipDokumen;
