import db from "../config/db_mysql.js";
import { formatDateIso } from "../utils/dateFormater.js";

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

export const getListTugas = async (cond, Arsiped = false) => {
  let symbol = "!=";
  if (Arsiped == true) {
    symbol = "=";
  }

  try {
    const [rows] = await db.query(
      `SELECT 
        id_tugas_luar, 
        judul_tugas, 
        lokasi, 
        tanggal_mulai, 
        tanggal_selesai,
        status_approval, 
        CASE 
          WHEN CURDATE() >= tanggal_mulai AND status != 'Selesai' THEN 'Diproses'  
          ELSE status 
        END as status 
      FROM tb_tugas_luar 
      WHERE status_approval ${symbol} "archived" ${cond} 
      ORDER BY tanggal_mulai ASC`
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching list tugas: " + error.message);
  }
};

export const deleteTugasLuar = async (id) => {
  try {
    const [result] = await db.query(
      "DELETE FROM `tb_tugas_luar` WHERE `id_tugas_luar` = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "Data kosong.",
      };
    }

    return {
      success: true,
      message: "tugas berhasil dihapus.",
    };
  } catch (error) {
    throw new Error("Gagal menghapus jabatan: " + error.message);
  }
};

export const getListTugasWithUser = async (valueParams, query = "") => {
  try {
    const [rows] = await db.query(
      `SELECT 
  tl.id_tugas_luar, 
  tl.judul_tugas, 
  tl.lokasi, 
  tl.tanggal_mulai, 
  tl.tanggal_selesai, 
  tl.status AS status, 
  tl.status_approval, 
  pv.*
FROM tb_tugas_luar AS tl
JOIN tb_pivot_tugas AS pv 
  ON pv.id_tugas_luar = tl.id_tugas_luar
  WHERE pv.id_pegawai = ? AND status_approval != "archived"
  ${query}
ORDER BY tl.tanggal_mulai ASC;
`,
      valueParams
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

export const getListTugasGrupTime = async () => {
  try {
    const [hasilTanggal] = await db.query(
      `SELECT DISTINCT DATE(tanggal_mulai) AS tanggal
FROM tb_tugas_luar
WHERE status != 'Selesai' AND tanggal_mulai >= CURDATE()
ORDER BY tanggal ASC 
LIMIT 4;`
    );
    const tanggalList = hasilTanggal.map((item) => item.tanggal);
    const placeholders = tanggalList.map(() => "?").join(", ");

    const [data] = await db.query(
      `SELECT 
    tl.id_tugas_luar, 
    tl.judul_tugas, 
    tl.lokasi, 
    tl.tanggal_mulai,  
    ur.nama,
    CASE 
      WHEN CURDATE() >= tl.tanggal_mulai AND tl.status != 'Selesai' THEN 'Diproses'  
      ELSE tl.status 
    END AS status 
  FROM tb_tugas_luar AS tl
  JOIN tb_pivot_tugas AS pv ON pv.id_tugas_luar = tl.id_tugas_luar
  JOIN tb_user AS ur ON ur.id_user = pv.id_pegawai
  WHERE DATE(tl.tanggal_mulai) IN (${placeholders})
  ORDER BY tl.tanggal_mulai ASC`,
      tanggalList
    );
    return data;
  } catch (error) {
    throw new Error("Error fetch data list tugas " + error.message);
  }
};

export const updateStatusApproveTugas = async (idTugas, status = "") => {
  const date = formatDateIso(new Date());
  try {
    const [result] = await db.query(
      `UPDATE tb_tugas_luar SET status_approval = ? ${status} , date_approval = ? WHERE id_tugas_luar = ?`,
      ["approve", date, idTugas]
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

export const getTugasByid = async (params, id) => {
  try {
    const [rows] = await db.query(
      `SELECT ${params} FROM tb_tugas_luar WHERE id_tugas_luar = ? `,
      [id]
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetch data detail: " + error.message);
  }
};
