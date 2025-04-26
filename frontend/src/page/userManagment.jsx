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

const UserManagment = () => {
  const navigate = useNavigate();
  const [getData, setGetData] = useState({ data: [], keys: [] });
  const [loading, setLoading] = useState(true);
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

  // passing data ke
  const rows = useMemo(
    () =>
      getData.data.map((row, index) => ({
        ...row,
        id: row.id_user,
        number: index + 1,
      })),
    [getData]
  );

  //function
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

  if (loading) {
    return (
      <div style={{ margin: "10px", padding: "10px" }}>
        <span>User Table</span>
        <div className="lo-bg-usermanagemnt">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div style={{ margin: "10px", padding: "10px" }}>
      <span>User Table</span>
      <Table columns={columns} rows={rows} />
    </div>
  );
};

export default UserManagment;
