import db from "../config/db_mysql.js";

export const getLogin = async () => {
  try {
    const [rows] = await db.query(
      "SELECT username, email, password FROM tb_user"
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};
