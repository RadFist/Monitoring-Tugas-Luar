import db from "../config/db_mysql.js";

export const getLaporan = async (id) => {
  try {
    const [data] = await db.query(
      `SELECT id_laporan ,materi, bagian, laporan, created_at as Tanggal_dibuat FROM tb_laporan WHERE id_tugas_luar = ?`,
      [id]
    );
    return data;
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
    throw new Error("Terjadi kesalahan saat menyimpan data");
  }
};

export const postLaporan = async (idTugas, laporan, bagian, materi) => {
  try {
    await db.query(
      `INSERT INTO tb_laporan(id_tugas_luar, materi, bagian, laporan) VALUES (?,?,?,?)`,
      [idTugas, materi, bagian, laporan]
    );
    await db.query(
      `UPDATE tb_tugas_luar SET status = ? WHERE id_tugas_luar = ?`,
      ["selesai", idTugas]
    );

    return { success: true, message: "data berhasil disimpan" };
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
    throw new Error("Terjadi kesalahan saat menyimpan data");
  }
};

export const patchLaporan = async (idLaporan, laporan, bagian, materi) => {
  try {
    await db.query(
      `UPDATE tb_laporan SET materi=? , bagian=?, laporan=? WHERE id_laporan = ?`,
      [materi, bagian, laporan, idLaporan]
    );

    return { success: true, message: "data berhasil disimpan" };
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
    throw new Error("Terjadi kesalahan saat menyimpan data");
  }
};

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

export const patchRincianDana = async (id, desk, jml) => {
  try {
    await db.query(
      `UPDATE tb_rincian_dana SET deskripsi = ? , jumlah = ? WHERE  id_rincian_dana = ?;`,
      [desk, jml, id]
    );
    return { success: true, message: "data berhasil diubah" };
  } catch (error) {
    console.error("Gagal mengubah data:", error);
    throw new Error("Terjadi kesalahan saat mengubah data");
  }
};

export const deleteRincianDana = async (idTugas, idRincian) => {
  try {
    const [data] = await db.query(
      `DELETE FROM tb_rincian_dana WHERE id_tugas_luar = ? AND id_rincian_dana = ?`,
      [idTugas, idRincian]
    );
    if (data.affectedRows === 0) {
      throw new Error(`User with ID not found or already deleted.`);
    }
    return `Successfully deleted foto`;
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
    throw new Error("Terjadi kesalahan saat menyimpan data");
  }
};
