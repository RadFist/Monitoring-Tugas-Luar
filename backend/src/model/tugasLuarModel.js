import db from "../config/db_mysql.js";

export const postTugas = async (
  id,
  tugas,
  dasar,
  perihal,
  lokasi,
  deskripsi,
  mulai,
  selesai,
  daftar
) => {
  try {
    // Simpan data utama ke tabel tugas_luar
    await db.query(
      `INSERT INTO tb_tugas_luar (id_tugas_luar, judul_tugas, dasar, perihal, deskripsi, lokasi, status, tanggal_mulai, tanggal_selesai)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        tugas,
        dasar,
        perihal,
        deskripsi,
        lokasi,
        "belum mulai",
        mulai,
        selesai,
      ]
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

export const getListTugas = async (cond = "1") => {
  try {
    const [rows] = await db.query(
      `SELECT 
        id_tugas_luar, 
        judul_tugas, 
        lokasi, 
        tanggal_mulai, 
        tanggal_selesai, 
        CASE 
          WHEN CURDATE() >= tanggal_mulai AND status != 'Selesai' THEN 'Diproses'  
          ELSE status 
        END as status 
      FROM tb_tugas_luar 
      WHERE ${cond} 
      ORDER BY tanggal_mulai ASC`
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching list tugas: " + error.message);
  }
};

export const getListTugasBYIdUser = async (id) => {
  try {
    const [rows] = await db.query(
      `SELECT 
  tl.id_tugas_luar, 
  tl.judul_tugas, 
  tl.lokasi, 
  tl.tanggal_mulai, 
  tl.tanggal_selesai, 
  pv.*,  
  CASE 
    WHEN CURDATE() >= tl.tanggal_mulai AND tl.status != 'Selesai' THEN 'Diproses'  
    ELSE tl.status 
  END AS status 
FROM tb_tugas_luar AS tl
JOIN tb_pivot_tugas AS pv 
  ON pv.id_tugas_luar = tl.id_tugas_luar
  WHERE pv.id_pegawai = ?
ORDER BY tl.tanggal_mulai ASC;
`,
      [id]
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching list tugas: " + error.message);
  }
};

export const getDetailTugas = async (id) => {
  try {
    const [rows] = await db.query(
      `SELECT 
  tugas.*,
  user.id_user,
  user.nama,
  user.nip,
  jb.jabatan,
  CASE 
    WHEN CURDATE() >= tugas.tanggal_mulai AND tugas.status != 'Selesai' THEN 'Diproses'
    ELSE tugas.status
  END AS status
FROM tb_tugas_luar AS tugas
JOIN tb_pivot_tugas AS pivot 
  ON pivot.id_tugas_luar = tugas.id_tugas_luar
  JOIN tb_user as user on user.id_user = pivot.id_pegawai
  JOIN tb_jabatan as jb on jb.id_jabatan = user.jabatan
WHERE tugas.id_tugas_luar = ? `,
      [id]
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetch data detail: " + error.message);
  }
};

export const updateStatusApproveTugas = async (id) => {
  try {
    const [result] = await db.query(
      `UPDATE tb_tugas_luar SET status_approval = ? WHERE id_tugas_luar = ?`,
      ["approve", id]
    );

    // Mengecek apakah data berhasil diupdate
    if (result.affectedRows > 0) {
      return { success: true, message: "Status updated to approve." };
    } else {
      return { success: false, message: "No record found with the given ID." };
    }
  } catch (error) {
    console.error("Error updating status approval:", error);
    return { success: false, message: "Database error.", error };
  }
};
