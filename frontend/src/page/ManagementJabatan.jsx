import "../style/userManagement.css";
import { Button } from "@mui/material";
import { DataTable as Table } from "../components/listManagement";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useMemo, useState } from "react";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import FormModal from "../components/modal";
import api from "../services/api";
import { HeaderSecond } from "../layout/headerSecond";

export const ManagJabat = () => {
  const [jabatanData, setJabatanData] = useState({ data: [], keys: [] });
  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [inputs, setInputs] = useState({});
  const [oldInputs, setOldInputs] = useState({});
  const [errorHandling, setErrorHandling] = useState({
    message: "",
    class: "",
  });

  useEffect(() => {
    const fetchJabatan = async () => {
      try {
        const response = (await api.get("/jabatan")).data;
        const data = response.data;
        setJabatanData({
          data,
          keys: data.length > 0 ? Object.keys(data[0]) : [],
        });
      } catch (err) {
        console.error("Error fetching jabatan:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJabatan();
  }, []);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "number", headerName: "No", width: 70 },
      { field: "jabatan", headerName: "Nama Jabatan", width: 450 },
      {
        field: "action",
        headerName: "Aksi",
        width: 150,
        sortable: false,
        renderCell: (params) => (
          <>
            <Button onClick={() => handlerEdit(params.id)}>
              <EditIcon />
            </Button>
            <Button
              style={{ color: "red" }}
              onClick={() => handlerDelete(params.id)}
            >
              <DeleteIcon />
            </Button>
          </>
        ),
      },
    ],
    [jabatanData.keys]
  );

  const rows = useMemo(
    () =>
      jabatanData.data.map((row, index) => ({
        ...row,
        id: row.id_jabatan,
        number: index + 1,
      })),
    [jabatanData]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handlerShowModal = () => {
    setModalActive(true);
  };

  const handlerCloseModal = () => {
    setInputs({});
    setOldInputs({});
    setModalActive(false);
    setErrorHandling({ message: "", class: "" });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!inputs.id_jabatan) {
        // Add
        await api.post("/jabatan", { jabatan: inputs.jabatan });
      } else {
        // Edit
        const dataUpdate = {};
        if (inputs.jabatan !== oldInputs.jabatan) {
          dataUpdate.jabatan = inputs.jabatan;
        }

        await api.patch(`/jabatan/${inputs.id_jabatan}`, dataUpdate);
      }

      const response = await api.get("/jabatan");
      const data = response.data.data;
      setJabatanData({
        data,
        keys: data.length > 0 ? Object.keys(data[0]) : [],
      });

      handlerCloseModal();
    } catch (err) {
      setErrorHandling({
        message: err?.response?.data?.message || "Gagal menyimpan data",
        class: "active",
      });
    }
  };

  const handlerEdit = (id) => {
    const dataEdit = jabatanData.data.find((j) => j.id_jabatan == id);
    setInputs({ ...dataEdit });
    setOldInputs({ ...dataEdit });
    setModalActive(true);
  };

  const handlerDelete = async (id) => {
    const confirmed = window.confirm("Yakin ingin menghapus jabatan ini?");
    if (!confirmed) return;
    try {
      await api.delete(`/jabatan/${id}`);
      setJabatanData((prev) => ({
        ...prev,
        data: prev.data.filter((j) => j.id_jabatan !== id),
      }));
    } catch (err) {
      console.error("Gagal menghapus:", err.message);
    }
  };

  if (loading) {
    return (
      <div>
        <HeaderSecond text="Manajemen Jabatan" />
        <div className="lo-bg-usermanagemnt">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div>
      <FormModal
        displayModal={modalActive ? "active" : ""}
        onSubmit={handlerSubmit}
        onClose={handlerCloseModal}
      >
        <label htmlFor="jabatan">Nama Jabatan</label>
        <input
          type="text"
          id="jabatan"
          name="jabatan"
          value={inputs.jabatan || ""}
          onChange={handleChange}
          required
        />
        <span className={`error-message ${errorHandling.class}`}>
          {errorHandling.message}
        </span>
        <button type="submit">Simpan</button>
      </FormModal>

      <HeaderSecond text="Manajemen Jabatan" />
      <div className="user-management-container">
        <Table
          columns={columns}
          rows={rows}
          handlerClickAdd={handlerShowModal}
        />
      </div>
    </div>
  );
};

export default ManagJabat;
