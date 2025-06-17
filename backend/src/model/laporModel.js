import db from "../config/db_mysql.js";

export const getRincianDana = async (id) => {
  try {
    const [data] = await db.query(
      `SELECT id_rincian_dana, deskripsi,jumlah FROM tb_rincian_dana WHERE id_tugas_luar = ?`,
      [id]
    );
    return data;
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
    throw new Error("Terjadi kesalahan saat menyimpan data");
  }
};

export const postRincianDana = async (id, desk, jml) => {
  try {
    await db.query(
      `INSERT INTO tb_rincian_dana(id_tugas_luar, deskripsi, jumlah) VALUES  (?,?,?)`,
      [id, desk, jml]
    );
    return { success: true, message: "data berhasil disimpan" };
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
    throw new Error("Terjadi kesalahan saat menyimpan data");
  }
};
