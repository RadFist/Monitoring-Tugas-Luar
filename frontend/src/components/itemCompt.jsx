import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

import { useState } from "react";
import { formatRupiah } from "../utils/formatedOther";

export const Item = ({ item, onDelete }) => {
  return (
    <div className="pegawai-info">
      <span>
        {item.nama} - {item.nip}
      </span>
      <button
        className="btn-delete-pegawai"
        onClick={(e) => {
          e.preventDefault();
          onDelete(item);
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export const RincianDana = ({
  item,
  onChange,
  onDelete,
  onSubmit,
  enabled,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  let component;
  let btn;

  if (isEditing) {
    component = (
      <div>
        <input
          type="text"
          name="deskripsi"
          value={item.deskripsi}
          onChange={(e) => {
            onChange(e, item.id_rincian_dana);
          }}
        />{" "}
        :{" "}
        <input
          type="number"
          name="jumlah"
          value={item.jumlah}
          onChange={(e) => {
            onChange(e, item.id_rincian_dana);
          }}
          min={1}
          onKeyDown={(e) => {
            // izinkan navigasi, backspace, delete, tab, dll.
            const allowedKeys = [
              "Backspace",
              "ArrowLeft",
              "ArrowRight",
              "Tab",
              "Delete",
            ];
            if (
              !/^\d$/.test(e.key) && // jika bukan angka 0-9
              !allowedKeys.includes(e.key)
            ) {
              e.preventDefault(); // blok karakter selain angka
            }
          }}
        />
      </div>
    );
    btn = (
      <button
        onClick={(e) => {
          e.preventDefault();
          onSubmit(item);
          setIsEditing(false);
        }}
      >
        <SaveIcon />
      </button>
    );
  } else {
    component = (
      <div className="rincian-dana-wrap">
        <p>{item.deskripsi}</p> : <p>Rp.{formatRupiah(item.jumlah)}</p>
      </div>
    );

    {
      !enabled ? (
        (btn = (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            <EditIcon />
          </button>
        ))
      ) : (
        <></>
      );
    }
  }

  return (
    <div className="rincian-dana-items">
      {component}
      <div className="cont-btn-action-rinci">
        {btn}
        {!enabled && (
          <button
            className="btn-delete-rinci"
            onClick={(e) => {
              e.preventDefault();
              onDelete(item.id_rincian_dana);
            }}
          >
            <DeleteIcon />
          </button>
        )}
      </div>
    </div>
  );
};
