import { useLocation, useNavigate, useParams } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import "../style/listTugas.css";
import { HeaderSecond } from "../layout/headerSecond";
import { useState } from "react";
import { useEffect } from "react";
import { FormControl, TextField } from "@mui/material";
import api from "../services/api";

export const ArsipDokumen = () => {
  const [daftarDokumen, setDaftarDokume] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const filterDate = query.get("dateFilter");
  const [filter, setFilter] = useState({ date: filterDate });

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
        setDaftarDokume(response.data.data);
      } catch (error) {}
    };
    fetchData();
    navigate(date);
  }, [filter]);

  const handlerClickDetail = (id) => {
    navigate(`/arsip/dokumen/${id}`);
  };
  return (
    <div>
      <HeaderSecond text="Arsip Dokumen">
        <FormControl size="small" style={{ marginRight: "20px" }}>
          <p className="filterLabel">Tanggal:</p>
          <TextField
            size="small"
            type="date"
            value={filter.date}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </FormControl>
      </HeaderSecond>

      <div className="content-list-tugas">
        <div className="list-tugas">
          {daftarDokumen.length === 0 ? (
            <p style={{ textAlign: "center" }} className="no-tugas-message">
              Arsip Kosong
            </p>
          ) : (
            daftarDokumen.map((item) => (
              <div className="tugas-item" key={item.id_tugas_luar}>
                <div className="tugas-header">
                  <h3>{item.judul_tugas}</h3>
                </div>
                <p>
                  <strong>lokasi:</strong> {item.lokasi}
                </p>
                <p>
                  <strong>tanggal:</strong> {item.tanggal_mulai}
                </p>
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
