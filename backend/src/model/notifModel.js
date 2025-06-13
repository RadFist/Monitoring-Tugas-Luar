import db from "../config/db_mysql.js";
export const saveNotif = async (id, notifMessage) => {
  try {
    const [rows] = await db.query(
      `INSERT INTO tb_notifikasi (user_id, message) VALUES (?, ?)`,
      [id, notifMessage]
    );
    return rows; // kalau ingin tahu ID insert atau hasil lainnya
  } catch (error) {
    console.error("Gagal menyimpan notifikasi:", error);
    throw error;
  }
};

export const getNotifById = async (id) => {
  try {
    const [rows] = await db.query(
      `SELECT message, created_at FROM tb_notifikasi WHERE user_id = ?`,
      [id]
    );
    return rows; // ← jangan lupa ini
  } catch (error) {
    console.error("Gagal mengambil notifikasi:", error);
    throw error; // ← penting agar error bisa ditangani di tempat lain
  }
};
