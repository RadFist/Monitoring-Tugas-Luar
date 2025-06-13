import db from "../config/db_mysql.js";

export const getAllUsers = async () => {
  try {
    const [rows] = await db.query(
      "SELECT u.id_user,u.username, u.nama, u.email, u.nip, u.level, j.jabatan, j.id_jabatan FROM tb_user AS u  JOIN tb_jabatan AS j ON u.jabatan = j.id_jabatan"
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

// level nip dan jabatan pada user apakah harus?
//refactor later
export const getUsersById = async (id) => {
  try {
    const [rows] = await db.query(
      `SELECT username, email, level FROM tb_user WHERE id_user =  ?`,
      [id]
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export const addingUser = async (
  id,
  username,
  nama,
  password,
  email,
  nip,
  level,
  Jabatan
) => {
  try {
    const [result] = await db.query(
      `INSERT INTO tb_user(id_user, username, nama, email, password, nip, level, jabatan) VALUES (?,?,?,?,?,?,?,?)`,
      [id, username, nama, email, password, nip, level, Jabatan]
    );
    if (result.affectedRows === 0) {
      throw new Error(`error adding user.`);
    }

    return `Successfully adding user with ID: ${id}`;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (field, value) => {
  try {
    const [result] = await db.query(
      `UPDATE tb_user SET ${field} WHERE id_user = ? `,
      value
    );
    if (result.affectedRows === 0) {
      throw new Error("user not found");
    }
    return "success";
  } catch (error) {
    throw error;
  }
};

export const deletUserById = async (id) => {
  try {
    const [result] = await db.query(`DELETE FROM tb_user WHERE id_user = ?`, [
      id,
    ]);

    if (result.affectedRows === 0) {
      throw new Error(`User with ID not found or already deleted.`);
    }

    return `Successfully deleted user with ID: ${id}`;
  } catch (error) {
    throw error;
  }
};

export const getAllUsersWhereJabatan = async (selectedJabatan) => {
  try {
    const [rows] = await db.query(
      "SELECT u.id_user,u.username, u.nama, u.nip, u.level, j.jabatan, j.id_jabatan FROM tb_user AS u  JOIN tb_jabatan AS j ON u.jabatan = j.id_jabatan WHERE j.id_jabatan = ?",
      [selectedJabatan]
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export const getAllUsersBYIdTugas = async (idTugas) => {
  try {
    const [rows] = await db.query(
      `SELECT u.id_user FROM tb_tugas_luar AS tl
      JOIN tb_pivot_tugas AS pt ON pt.id_tugas_luar = tl.id_tugas_luar
      JOIN tb_user AS u ON u.id_user = pt.id_pegawai
      WHERE tl.id_tugas_luar = ?`,
      [idTugas] // << perbaikan: bungkus dengan array
    );
    return rows; // << penting: agar hasilnya bisa digunakan
  } catch (error) {
    console.error("Error saat mengambil user dari tugas:", error);
    throw error; // << opsional: lempar lagi jika ingin ditangani di controller
  }
};
