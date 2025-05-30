import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Item } from "./itemCompt";
// import { useState } from "react";

export const DataTable = ({ rows, columns, handlerClickAdd }) => {
  // const [selected, setSelected] = useState([]);
  const paginationModel = { page: 0, pageSize: 10 };

  // const handleSelectionModelChange = (newSelectionModel) => {
  //   const selectedIds = [...newSelectionModel.ids]; // Mengubah Set ke array
  //   setSelected(selectedIds); // Update state dengan ID yang terpilih
  //   console.log("Selected IDs:", selectedIds); // Menampilkan ID yang dipilih
  // };

  return (
    <Paper
      sx={{
        width: "100%",
        padding: "20px",
        marginTop: "5px",
        boxSizing: "border-box",
      }}
    >
      <Button variant="contained" color="primary" onClick={handlerClickAdd}>
        Tambah Data
      </Button>
      <DataGrid
        // visibility
        columnVisibilityModel={{
          id: false,
          id_jabatan: false,
        }}
        disableColumnMenu
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        // onRowSelectionModelChange={handleSelectionModelChange}
        // selectionModel={selected}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export const listItem = ({ list, onDelete }) => {
  return (
    <div className="list-pegawai-container">
      <h4>Daftar Pegawai yang Ditambahkan:</h4>
      <ul className="pegawai-list">
        {list.map((item) => (
          <li key={item.id} className="pegawai-item">
            <Item item={item} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};
