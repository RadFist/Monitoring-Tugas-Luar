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
    // 1. Simpan data utama ke tabel tugas_luar
    await db.query(
      `INSERT INTO tb_tugas_luar (id_tugas_luar, judul_tugas, deskripsi, lokasi, status, tanggal_mulai, tanggal_selesai)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, tugas, deskripsi, lokasi, "belum mulai", mulai, selesai]
    );

    // 2. Simpan banyak pegawai ke tabel relasi tugas_pegawai
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
