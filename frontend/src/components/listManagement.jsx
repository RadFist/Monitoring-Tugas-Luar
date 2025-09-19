import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button, TextField, Box } from "@mui/material";
import { Item, RincianDana } from "./itemCompt";
import { useState } from "react";
// import { useState } from "react";

export const DataTable = ({ rows, columns, handlerClickAdd }) => {
  // const [selected, setSelected] = useState([]);
  const [searchText, setSearchText] = useState("");
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
      <Box
        className="haeder-usermanajemen"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Button variant="contained" color="primary" onClick={handlerClickAdd}>
          Tambah Data
        </Button>

        <TextField
          size="small"
          placeholder="Cari data...🔎"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

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
        initialState={{
          pagination: { paginationModel },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        filterModel={{
          items: [],
          quickFilterValues: searchText ? [searchText] : [],
        }}
        // checkboxSelection
        // onRowSelectionModelChange={handleSelectionModelChange}
        // selectionModel={selected}

        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export const ListItem = ({ list, onDelete }) => {
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

export const ListRincianDana = ({
  list = [],
  onChange,
  onDelete,
  onSubmit,
  enabled,
}) => {
  return (
    <div className="list-pegawai-container">
      <ul className="pegawai-list">
        {list.map((item) => (
          <li key={item.id_rincian_dana} className="rincian-item">
            <RincianDana
              item={item}
              onChange={onChange}
              onDelete={onDelete}
              onSubmit={onSubmit}
              enabled={enabled}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

// components/listManagement.jsx
export const ListUserProductivity = ({ data = [] }) => {
  return (
    <div className="list-productivity-wrapper">
      <h2 className="list-productivity-title">
        Pegawai dengan Tugas Luar Terbanyak
      </h2>
      <div className="list-productivity-content">
        {data.length === 0 ? (
          <p className="empty-data">Belum ada data tersedia</p>
        ) : (
          data.map((item, index) => (
            <div key={index} className="user-productivity-item">
              <div className="user-rank">{index + 1}</div>
              <div className="user-name">{item.nama}</div>
              <div className="user-count">{item.tugas} tugas</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
