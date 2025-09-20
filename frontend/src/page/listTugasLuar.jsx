import "../style/listTugas.css";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RejectIcon from "@mui/icons-material/DoNotDisturbOn";
import { FormControl, TextField, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/tokenManpulation";
import { SuccessModal } from "../components/modal";
import api from "../services/api";
import { HeaderSecond } from "../layout/headerSecond";
import { formatDateOnly } from "../utils/formatedTime";

const ListTugas = () => {
  const token = getToken();
  const payload = token ? jwtDecode(token) : "";
  const level = payload.level;
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const today = formatDateOnly(new Date());

  const filterDate = query.get("date") || "";
  const FilterStatusApproval =
    query.get("status_approval") || (level === "camat" && !filterDate)
      ? "pending"
      : "none";
  const filterStatus = query.get("status");

  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [daftarTugas, setDaftarTugas] = useState([]);
  const [filter, setFilter] = useState({
    date: filterDate,
    status_approval: FilterStatusApproval,
    status: filterStatus || "none",
    tugas: "semua",
  });

  const roleRoutes = {
    camat: "/tugas/approval",
    pegawai: "user/tugas/" + payload.id_user,
    kasi:
      filter.tugas === "saya" ? `user/tugas/${payload.id_user}` : "/allTugas",
  };

  let routeList = roleRoutes[level] || "/allTugas";

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(routeList);

        let routeFilter = "";
        const queryParams = [];

        if (filter.date) {
          queryParams.push(`date=${filter.date}`);
        }
        if (filter.status_approval && filter.status_approval !== "none") {
          queryParams.push(`status_approval=${filter.status_approval}`);
        }
        if (filter.status && filter.status !== "none") {
          queryParams.push(`status=${filter.status}`);
        }

        if (queryParams.length > 0) {
          routeFilter += "?" + queryParams.join("&");
        }
        // navigate(routeFilter);

        const responseGetListTugas = (await api.get(routeList + routeFilter))
          .data;

        setDaftarTugas(responseGetListTugas.data);
      } catch (error) {
        console.error("Error fetching :", error.message);
      } finally {
        setLoading(false);
        //kalo error dia kosong anjir
      }
    };

    fetchData();
  }, [filter]);

  const handlerClickDetail = (id) => {
    navigate(`Detail-Penugasan/${id}`);
  };

  const handlerCloseModal = () => {
    setModalActive(false);
  };

  const handlerApprove = async (id, tanggal) => {
    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menyetujui tugas ini?"
    );

    if (!konfirmasi) return;
    try {
      const response = await api.patch(`/PenugasanTugasLuar/Approve`, {
        id: id,
        tanggal: tanggal,
      });
      if (response.data && response.data.success) {
        setFilter((prev) => ({
          ...prev,
          status_approval: "approve",
          status: "none",
        }));
      } else {
        console.error("Gagal memperbarui daftar tugas:", error);
      }
      setModalActive(true);
    } catch (error) {
      console.error("Terjadi kesalahan saat menyetujui tugas:", error);
    }
  };

  const handlerChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      status_approval: e.target.value,
    }));
    if (e.target.value == "pending") {
      setFilter((prev) => ({
        ...prev,
        status: "none",
      }));
    }
  };

  const handlerReject = async (id, judul) => {
    const konfirmasi = window.confirm(
      `Apakah Anda yakin ingin menghapus tugas "${judul}"?`
    );
    if (!konfirmasi) return;

    try {
      await api.delete(`/tugas/${id}`, {
        data: { judul },
      });
      setDaftarTugas((prevTugas) =>
        prevTugas.filter((tugas) => tugas.id_tugas_luar !== id)
      );
    } catch (error) {
      console.error("Gagal menghapus tugas:", error);
    }
  };

  return (
    <div>
      <HeaderSecond text={level == "pegawai" ? "Tugas Anda" : "List Tugas"}>
        {level === "kasi" && (
          <FormControl size="small">
            <p className="filterLabel">Tugas:</p>
            <Select
              value={filter.tugas}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  tugas: e.target.value,
                }))
              }
            >
              {["semua", "saya"].map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

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

        {level === "camat" && (
          <FormControl size="small" style={{ marginRight: "20px" }}>
            <p className="filterLabel">Approval:</p>
            <Select
              value={filter.status_approval}
              onChange={(e) => {
                handlerChange(e);
              }}
            >
              {["approve", "pending"].map((status) => (
                <MenuItem key={status} value={status}>
                  {status === "none"
                    ? "NONE"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {filter.status_approval != "pending" && (
          <FormControl size="small">
            <p className="filterLabel">Status:</p>
            <Select
              value={filter.status}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            >
              {["none", "selesai", "Diproses", "belum mulai"].map((status) => (
                <MenuItem key={status} value={status}>
                  {status === "none"
                    ? "NONE"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </HeaderSecond>

      <div className="content-list-tugas">
        {(loading && <Loading />) || (
          <div className="list-tugas">
            <SuccessModal
              displayModal={modalActive ? "active" : ""}
              onClose={handlerCloseModal}
            />
            {daftarTugas.length === 0 ? (
              <p style={{ textAlign: "center" }} className="no-tugas-message">
                {level == "pegawai"
                  ? "Anda belum ditugaskan"
                  : "Tidak ada tugas baru-baru ini"}
              </p>
            ) : (
              daftarTugas.map((item) => (
                <div className="tugas-item" key={item.id_tugas_luar}>
                  <div className="tugas-header">
                    <h3>{item.judul_tugas}</h3>
                    {item.status_approval == "approve" && (
                      <span
                        className={`status ${
                          today >= item.tanggal_mulai &&
                          item.status === "belum mulai"
                            ? "diproses"
                            : item.status.replace(/\s+/g, "-").toLowerCase()
                        }`}
                      >
                        {today >= item.tanggal_mulai &&
                        item.status === "belum mulai"
                          ? "Diproses"
                          : item.status}
                      </span>
                    )}
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
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          className={`reject-button ${
                            item.status_approval === "approve"
                              ? "invisible"
                              : ""
                          }`}
                          onClick={(e) => {
                            handlerReject(item.id_tugas_luar, item.judul_tugas);
                          }}
                        >
                          Reject
                          <RejectIcon sx={{ fontSize: 14 }} />
                        </button>
                        <button
                          disabled={item.status_approval === "approve"}
                          className={`approve-button ${
                            item.status_approval === "approve"
                              ? "btn-disabled"
                              : ""
                          }`}
                          onClick={() =>
                            handlerApprove(
                              item.id_tugas_luar,
                              item.tanggal_mulai
                            )
                          }
                        >
                          Approve
                          <CheckCircleIcon sx={{ fontSize: 14 }} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListTugas;
