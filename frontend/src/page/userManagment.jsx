import "../style/userManagement.css";
import { Button } from "@mui/material";
import { DataTable as Table } from "../components/listManagement";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getService, deleteService } from "../services/fetchService";
import { getToken } from "../utils/tokenManpulation";
import { useEffect, useMemo, useState } from "react";
import { chekAuthToken } from "../components/logic/PrivateWarperAuth";
import { loadingCompSpin as Loading } from "../components/LoadingComp";
import { useNavigate } from "react-router-dom";
import FormModal from "../components/modal";
import { AddUser } from "../services/authServices";

const UserManagment = () => {
  const navigate = useNavigate();
  const [getData, setGetData] = useState({ data: [], keys: [] });
  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  let token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await chekAuthToken(getToken(), navigate);
        const response = await getService("/users", token);
        const data = response.data || [];
        setGetData({
          data,
          keys: data.length > 0 ? Object.keys(data[0]) : [],
        });
      } catch (error) {
        console.error("Error fetching :", error.message);
        //navigate to 500 server error
        // navigate("/login");
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
      { field: getData.keys[2], headerName: "Email", width: 130 },
      {
        field: "action",
        width: 170,
        sortable: false,
        renderCell: (params) => (
          <>
            <Button
              onClick={() => {
                alert("edit id: " + params.id);
              }}
            >
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
  async function handlerDelete(id) {
    try {
      const confirmed = window.confirm("Yakin ingin menghapus user ini?");
      if (!confirmed) return;

      const response = await deleteService(`/user/delete/${id}`, token);
      if (response) {
        setGetData((prev) => ({
          ...prev,
          data: prev.data.filter((user) => user.id_user !== id),
        }));
      }
      console.log("User deleted:", id);
    } catch (error) {
      console.error("Error fetching :", error.message);
      //refactor if token exp
      if (error.message === "token expired") {
        // navigate("/login");
        // clearToken();
      }
    }
  }

  function handlerShowModal() {
    setModalActive(!modalActive);
  }
  function handlerCloseModal() {
    setModalActive(false);
  }

  async function handlerSubmitAdd(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
      email: formData.get("email"),
      level: formData.get("level"),
    };

    try {
      await AddUser(data.username, data.password, data.email, data.level);

      const response = await getService("/users", token);
      const dataUserBaru = response.data || [];

      setGetData({
        data: dataUserBaru,
        keys: dataUserBaru.length > 0 ? Object.keys(dataUserBaru[0]) : [],
      });

      e.target.reset();

      setModalActive(false);
    } catch (error) {
      console.error("Error saat sign in:", error);
    }
  }
  //loading
  if (loading) {
    return (
      <div style={{ margin: "10px", padding: "10px" }}>
        <span className="title-table-user">USER TABLE</span>
        <div className="lo-bg-usermanagemnt">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div style={{ margin: "10px", padding: "10px" }}>
      <FormModal
        displayModal={modalActive ? "active" : ""}
        onSubmit={handlerSubmitAdd}
        onClose={handlerCloseModal}
      >
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="level">Level</label>
        <select name="level" id="level">
          <option value="">-- Pilih Level --</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="guest">Guest</option>
        </select>

        <button type="submit">Create</button>
      </FormModal>
      <span className="title-table-user">USER TABLE</span>
      <Table columns={columns} rows={rows} handlerClickAdd={handlerShowModal} />
    </div>
  );
};

export default UserManagment;
