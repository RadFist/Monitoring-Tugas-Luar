import DeleteIcon from "@mui/icons-material/Delete";

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
