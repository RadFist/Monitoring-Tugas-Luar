import db from "../config/db_mysql.js";

export const getListJabatan = async () => {
  try {
    const [rows] = await db.query("SELECT * from tb_jabatan");
    return rows;
  } catch (error) {
    throw new Error("Error fetching list Jabatan: " + error.message);
  }
};
export const getListJabatanLimit = async () => {
  try {
    const [rows] = await db.query(
      `SELECT * from tb_jabatan WHERE jabatan != "camat" AND jabatan != "admin"`
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching list Jabatan: " + error.message);
  }
};

export const createJabatan = async (jabatan) => {
  const [result] = await db.query(
    "INSERT INTO tb_jabatan (jabatan) VALUES (?)",
    [jabatan]
  );
  return result;
};

export const updateJabatanById = async (id, jabatan) => {
  try {
    const [result] = await db.query(
      "UPDATE tb_jabatan SET jabatan = ? WHERE id_jabatan = ?",
      [jabatan, id]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "Data jabatan tidak ditemukan atau tidak diubah.",
      };
    }

    return {
      success: true,
      message: "Jabatan berhasil diperbarui.",
    };
  } catch (error) {
    throw new Error("Gagal mengupdate jabatan: " + error.message);
  }
};

export const deleteJabatanById = async (id) => {
  try {
    const [result] = await db.query(
      "DELETE FROM tb_jabatan WHERE id_jabatan = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "Data jabatan tidak ditemukan atau sudah dihapus.",
      };
    }

    return {
      success: true,
      message: "Jabatan berhasil dihapus.",
    };
  } catch (error) {
    throw new Error("Gagal menghapus jabatan: " + error.message);
  }
};
