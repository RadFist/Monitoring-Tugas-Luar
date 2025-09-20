import "../style/userManagement.css";
import { Button } from "@mui/material";
import { DataTable as Table } from "../components/listManagement";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useMemo, useState } from "react";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import FormModal from "../components/modal";
import { AddUser } from "../services/authServices";
import api, { plainApi } from "../services/api";
import { HeaderSecond } from "../layout/headerSecond";

const UserManagment = () => {
  const [getData, setGetData] = useState({ data: [], keys: [] });
  const [jabatanOptions, setJabatanOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [inputs, setInputs] = useState({});
  const [oldInputs, setOldInputs] = useState({});
  const [errorHandling, setErrorHandiling] = useState({
    message: "",
    class: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGetUsaer = (await api.get("/users")).data;
        const responseGetJabatan = (await api.get("/Jabatan/usermanagement"))
          .data;
        setJabatanOptions(responseGetJabatan.data);
        const data = responseGetUsaer.data || [];
        setGetData({
          data,
          keys: data.length > 0 ? Object.keys(data[0]) : [],
        });
      } catch (error) {
        console.error("Error fetching :", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //column setting

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "number", headerName: "No", width: 70 },
      { field: getData.keys[1], headerName: "Username", width: 130 },
      { field: getData.keys[2], headerName: "Nama", width: 130 },
      { field: getData.keys[3], headerName: "Email", width: 200 },
      { field: getData.keys[4], headerName: "nip", width: 200 },
      { field: getData.keys[6], headerName: "Jabatan", width: 130 },
      { field: getData.keys[5], headerName: "Level", width: 130 },
      {
        field: getData.keys[7],
        headerName: "id_jabatan",
        width: 10,
      },
      {
        field: "action",
        width: 170,
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
    [getData.keys]
  );
  // penambahan id sebagai key untuk dipasing ke Data Grid

  const rows = useMemo(
    () =>
      getData.data.map((row, index) => ({
        ...row,
        id: row.id_user,
        number: index + 1,
      })),
    [getData]
  );

  //function handler and logic
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handlerShowModal = () => {
    setModalActive(!modalActive);
  };

  const handlerCloseModal = () => {
    setInputs({});
    setModalActive(false);
    setErrorHandiling({
      message: "",
      class: "",
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.id_user) {
      //add user
      try {
        await AddUser(
          inputs.username,
          inputs.nama,
          inputs.password,
          inputs.email,
          inputs.nip,
          inputs.Jabatan,
          inputs.level
        );

        const response = (await api.get("/users")).data;
        const newDataUser = response.data || [];

        setGetData({
          data: newDataUser,
          keys: newDataUser.length > 0 ? Object.keys(newDataUser[0]) : [],
        });

        setInputs({});
        setModalActive(false);

        setErrorHandiling({
          message: "",
          class: "",
        });
      } catch (error) {
        let message = "";
        if (error.status) {
          message = error.response.data.message;
        } else {
          message = "Sorry something error";
        }

        console.error("Error saat adding:", error);

        setErrorHandiling({
          message: message,
          class: "active",
        });
      }
      //edit user
    } else {
      const dataUpdate = Object.keys(inputs).reduce((acc, key) => {
        if (inputs[key] !== oldInputs[key]) {
          acc[key] = inputs[key]; // Hanya simpan data yang berubah
        }
        return acc;
      }, {});

      console.log(dataUpdate);

      try {
        await api.patch(`/user/edit/${inputs.id_user}`, {
          ...dataUpdate,
        });

        const response = (await api.get("/users")).data;
        const newDataUser = response.data || [];

        setGetData({
          data: newDataUser,
          keys: newDataUser.length > 0 ? Object.keys(newDataUser[0]) : [],
        });

        setInputs({});
        setOldInputs({});
        setErrorHandiling({
          message: "",
          class: "",
        });
        setModalActive(false);
      } catch (error) {
        let message = "";
        if (error.status) {
          message = error.response.data.message;
        } else {
          message = "Sorry something error";
        }

        console.error("Error saat adding:", error);

        setErrorHandiling({
          message: message,
          class: "active",
        });
      }
    }
  };

  const handlerEdit = (id) => {
    const dataEdit = getData.data.find((user) => user.id_user === id);

    setInputs({
      id_user: dataEdit.id_user,
      username: dataEdit.username,
      nama: dataEdit.nama,
      password: "value",
      email: dataEdit.email,
      nip: dataEdit.nip,
      level: dataEdit.level,
      Jabatan: dataEdit.id_jabatan,
    });
    setOldInputs({
      id_user: dataEdit.id_user,
      username: dataEdit.username,
      nama: dataEdit.nama,
      password: "value",
      email: dataEdit.email,
      nip: dataEdit.nip,
      level: dataEdit.level,
      Jabatan: dataEdit.id_jabatan,
    });

    setModalActive(!modalActive);
  };

  const handlerDelete = async (id) => {
    try {
      const confirmed = window.confirm("Yakin ingin menghapus user ini?");
      if (!confirmed) return;

      const response = await api.delete(`/user/delete/${id}`);
      if (response) {
        setGetData((prev) => ({
          ...prev,
          data: prev.data.filter((user) => user.id_user !== id),
        }));
      }
      console.log("User deleted:", id);
    } catch (error) {
      console.error("Error fetching :", error.message);
    }
  };

  //loading
  if (loading) {
    return (
      <div>
        <HeaderSecond text="List Tugas"></HeaderSecond>
        <span className="title-table-user">USER TABLE</span>
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
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="nama">Nama</label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={inputs.nama || ""}
          onChange={handleChange}
          required
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="nip">Nip</label>
            <input
              type="number"
              id="nip"
              name="nip"
              value={inputs.nip || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div>
            <label htmlFor="Jabatan">jabatan</label>
            <select
              name="Jabatan"
              id="Jabatan"
              value={inputs.Jabatan || ""}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih Jabatan--</option>
              {jabatanOptions.map((item) => (
                <option key={item.id_jabatan} value={item.id_jabatan}>
                  {item.jabatan}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="level">Level</label>
            <select
              name="level"
              id="level"
              value={inputs.level || ""}
              onChange={handleChange}
            >
              <option value="">-- Pilih Level --</option>
              <option value="kasi">Kasi</option>
              <option value="pegawai">Pegawai</option>
              <option value="camat">Camat</option>
              <option value="admin">admin</option>
            </select>
          </div>
        </div>
        <span className={`error-message ${errorHandling.class}`}>
          {errorHandling.message || ""}
        </span>
        <button type="submit">Create</button>
      </FormModal>
      <HeaderSecond text="User Management"></HeaderSecond>
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

export default UserManagment;
