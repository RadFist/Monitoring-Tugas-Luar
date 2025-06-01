import db from "../config/db_mysql.js";

export const postTugas = async (
  id,
  tugas,
  lokasi,
  deskripsi,
  mulai,
  selesai,
  daftar
) => {
  try {
    // Simpan data utama ke tabel tugas_luar
    await db.query(
      `INSERT INTO tb_tugas_luar (id_tugas_luar, judul_tugas, deskripsi, lokasi, status, tanggal_mulai, tanggal_selesai)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, tugas, deskripsi, lokasi, "belum mulai", mulai, selesai]
    );

    // Simpan banyak pegawai ke tabel relasi tugas_pegawai
    for (let pegawai of daftar) {
      await db.query(
        `INSERT INTO tb_pivot_tugas (id_tugas_luar, id_pegawai) VALUES (?, ?)`,
        [id, pegawai.id]
      );
    }

    return { success: true, message: "Tugas dan pegawai berhasil disimpan" };
  } catch (error) {
    console.error("Gagal menyimpan tugas:", error);
    throw new Error("Terjadi kesalahan saat menyimpan data");
  }
};

export const getListTugas = async () => {
  try {
    const [rows] = await db.query(
      "SELECT id_tugas_luar, judul_tugas, judul_tugas, lokasi, tanggal_mulai, tanggal_selesai, CASE WHEN CURDATE() = tanggal_mulai AND status != 'Selesai' THEN 'Diproses'  ELSE status END as status FROM `tb_tugas_luar` ORDER by tanggal_mulai  ASC "
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching list tugas: " + error.message);
  }
};
