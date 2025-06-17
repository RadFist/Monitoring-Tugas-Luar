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
      "SELECT u.id_user, u.username, u.nama, u.nip, u.email ,u.password ,u.level , j.jabatan  FROM tb_user as u JOIN tb_jabatan as j ON j.id_jabatan = u.jabatan WHERE (username = ? OR email = ?)",
      [username, username]
    );

    return rows;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};
