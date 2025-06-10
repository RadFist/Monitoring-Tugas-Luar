import "../style/listTugas.css";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/tokenManpulation";
import { SuccessModal } from "../components/modal";
import api from "../services/api";
import { HeaderSecond } from "../layout/headerSecond";

const ListTugas = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const filterDate = query.get("filterDate");

  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [daftarTugas, setDaftarTugas] = useState([]);
  const [filter, setFilter] = useState({
    date: filterDate || "",
    status: "none",
  });
  const token = getToken();
  const payload = token ? jwtDecode(token) : "";
  const level = payload.level;
  const roleRoutes = {
    camat: "/allTugas/approval",
    user: "/tugas/" + payload.id_user,
  };
  let routeList = roleRoutes[level] || "/allTugas";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGetListTugas = (await api.get(routeList)).data;
        setDaftarTugas(responseGetListTugas.data);
      } catch (error) {
        console.error("Error fetching :", error.message);
      } finally {
        setLoading(false);
        //kalo error dia kosong anjir
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(filter);
  // }, [filter]);

  if (loading) {
    return (
      <div>
        <HeaderSecond text="List Tugas">
          <FormControl size="small" style={{ marginRight: "20px" }}>
            {/* <InputLabel>Fillter Date</InputLabel> */}
            <TextField
              size="small"
              type="date"
              value={filter.date}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </FormControl>
          <FormControl size="small">
            {/* <InputLabel>Fillter Status</InputLabel> */}

            <Select
              value={filter.status}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              {level === "camat" ? (
                <>
                  <MenuItem value="none">NONE</MenuItem>
                  <MenuItem value="approve">Approve</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </>
              ) : (
                // Menu untuk user non-camat
                ["none", "approve", "pending"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status === undefined
                      ? "NONE"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </HeaderSecond>
        <div className="content-list-tugas">
          <Loading />
        </div>
      </div>
    );
  }

  const handlerClickDetail = (id) => {
    navigate(`Detail-Penugasan/${id}`);
  };
  const handlerCloseModal = () => {
    setModalActive(false);
  };

  const handlerApprove = async (id) => {
    if (!id) {
      console.error("ID tugas tidak valid.");
      return;
    }
    try {
      const response = await api.patch(`/PenugasanTugasLuar/Approve`, {
        id: id,
      });
      if (response.data && response.data.success) {
        try {
          const responseRefreshedGetListTugas = (await api.get(routeList)).data;
          setDaftarTugas(responseRefreshedGetListTugas.data);
        } catch (error) {}
      } else {
        console.error("Gagal memperbarui daftar tugas:", error);
      }
      setModalActive(true);
    } catch (error) {
      console.error("Terjadi kesalahan saat menyetujui tugas:", error);
    }
  };

  return (
    <div>
      <HeaderSecond text="List Tugas">
        <FormControl size="small" style={{ marginRight: "20px" }}>
          {/* <InputLabel>Fillter Date</InputLabel> */}
          <TextField
            size="small"
            type="date"
            value={filter.date}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </FormControl>
        <FormControl size="small">
          {/* <InputLabel>Fillter Status</InputLabel> */}

          <Select
            value={filter.status}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            {level === "camat" ? (
              <>
                <MenuItem value="none">NONE</MenuItem>
                <MenuItem value="approve">Approve</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </>
            ) : (
              // Menu untuk user non-camat
              ["none", "approve", "pending"].map((status) => (
                <MenuItem key={status} value={status}>
                  {status === undefined
                    ? "NONE"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </HeaderSecond>
      <div className="content-list-tugas">
        <div className="list-tugas">
          <SuccessModal
            displayModal={modalActive ? "active" : ""}
            onClose={handlerCloseModal}
          />
          {daftarTugas.length === 0 ? (
            <p style={{ textAlign: "center" }} className="no-tugas-message">
              Tidak ada tugas baru-baru ini
            </p>
          ) : (
            daftarTugas.map((item) => (
              <div className="tugas-item" key={item.id_tugas_luar}>
                <div className="tugas-header">
                  <h3>{item.judul_tugas}</h3>
                  <span
                    className={`status ${item.status
                      .replace(" ", "-")
                      .toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p>
                  <strong>lokasi:</strong> {item.lokasi}
                </p>
                <p>
                  <strong>tanggal:</strong> {item.tanggal_mulai}
                </p>
                <div className="button-cont-listTugas">
                  <button
                    className="detail-button"
                    onClick={(e) => {
                      e.preventDefault();
                      handlerClickDetail(item.id_tugas_luar);
                    }}
                  >
                    Detail <ArrowIcon sx={{ fontSize: 14 }} />
                  </button>
                  {level === "camat" && (
                    <button
                      className="approve-button"
                      onClick={() => handlerApprove(item.id_tugas_luar)}
                    >
                      Approve
                      <CheckCircleIcon sx={{ fontSize: 14 }} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ListTugas;
