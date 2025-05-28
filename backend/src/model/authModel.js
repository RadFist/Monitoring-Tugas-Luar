import db from "../config/db_mysql.js";

export const register = async (
  id,
  username,
  nama,
  password,
  email,
  nip,
  jabatan,
  level
) => {
  try {
    await db.query(
      `INSERT INTO tb_user(id_user, username, nama, email, password, nip, jabatan , level) VALUES (?,?,?,?,?,?,?,?)`,
      [id, username, nama, email, password, nip, jabatan, level]
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const getLogin = async (username) => {
  try {
    const [rows] = await db.query(
      "SELECT id_user, username, nama, nip, email ,password ,level FROM tb_user WHERE (username = ? OR email = ?)",
      [username, username]
    );

    return rows;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};
