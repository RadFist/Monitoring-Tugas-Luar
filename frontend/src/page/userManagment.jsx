import "../style/userManagement.css";
import { Button } from "@mui/material";
import { DataTable as Table } from "../components/listManagement";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getService, deleteService } from "../services/fetchService";
import { getToken } from "../utils/tokenManpulation";
import { useEffect, useState } from "react";
import { loadingCompSpin as Loading } from "../components/LoadingComp";

const userManagment = () => {
  const [getData, setGetData] = useState({ data: "", keys: "" });
  const token = getToken("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getService("/users", token);
        setGetData({
          data: response.data,
          keys: Object.keys(response.data[0]),
        });
      } catch (error) {
        console.error("Error fetching :", error.message);
        if (error.message === "token expired") {
          // navigate("/login");
          // clearToken();
        }
      }
    };

    fetchData();
  }, []);

  if (getData.keys.length === 0) {
    return (
      <div style={{ margin: "10px", padding: "10px" }}>
        <span>User Table</span>
        <div className="lo-bg-usermanagemnt">
          <Loading />
        </div>
      </div>
    );
  }

  //column setting
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "number", headerName: "ID", width: 70 },
    { field: getData.keys[1], headerName: "Username", width: 130 },
    { field: getData.keys[2], headerName: "Email", width: 130 },
    //delete later
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   width: 160,
    //   sortable: true,
    //   valueGetter: (value, row) =>
    //     `${row.firstName || null} ${row.lastName || null}`, // Gabungin firstName dan lastName
    //   sortComparator: (v1, v2) => {
    //     return `${v1}`.toLowerCase().localeCompare(`${v2}`.toLowerCase());
    //   },
    // },
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
  ];

  // passing data ke
  const rows = getData.data.map((row, index) => ({
    ...row,
    id: row.id_user,
    number: index + 1,
  }));

  //function
  async function handlerDelete(id) {
    alert("deleting user by id: " + id);
    try {
      const response = await deleteService(`/user/delete/${id}`, token);
      if (response) {
        alert("delete complite");
      }
    } catch (error) {
      console.error("Error fetching :", error.message);
      //refactor if token exp
      if (error.message === "token expired") {
        // navigate("/login");
        // clearToken();
      }
    }
  }
  return (
    <div style={{ margin: "10px", padding: "10px" }}>
      <span>User Table</span>
      <Table columns={columns} rows={rows} />
    </div>
  );
};

export default userManagment;
