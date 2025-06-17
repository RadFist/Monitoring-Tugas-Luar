import db from "../config/db_mysql.js";

export const getFoto = async (id) => {
  try {
    const [data] = await db.query(
      `SELECT file_url FROM tb_dokumentasi WHERE id_tugas_luar = ?`,
      [id]
    );
    return data;
  } catch (error) {
    console.error("failed fetch foto:", error);
    throw new Error("somthing went wrong while fetching data");
  }
};

export const postFoto = async (id, name) => {
  try {
    await db.query(
      `INSERT INTO tb_dokumentasi(id_tugas_luar, file_url) VALUES (?,?)`,
      [id, name]
    );
    return { success: true, message: "foto berhasil disimpan" };
  } catch (error) {
    console.error("Gagal menyimpan foto:", error);
    throw new Error("Terjadi kesalahan saat menyimpan data");
  }
};

export const deleteFoto = async (id, fileName) => {
  try {
    const [data] = await db.query(
      `  DELETE FROM tb_dokumentasi WHERE id_tugas_luar = ? AND file_url = ?`,
      [id, fileName]
    );
    if (data.affectedRows === 0) {
      throw new Error(`User with ID not found or already deleted.`);
    }

    return `Successfully deleted foto`;
  } catch (error) {
    throw error;
  }
};
