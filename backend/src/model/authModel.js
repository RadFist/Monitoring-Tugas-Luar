import db from "../config/db_mysql.js";

export const register = async (id, username, password, email) => {
  try {
    await db.query(
      `INSERT INTO tb_user(id_user, username, email, password) VALUES (?,?,?,?)`,
      [id, username, email, password]
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const getLogin = async (username, password) => {
  try {
    const [rows] = await db.query(
      "SELECT id_user, username, email ,password FROM tb_user WHERE (username = ? OR email = ?)",
      [username, username]
    );

    return rows;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};
