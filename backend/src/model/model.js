import db from "../config/db_mysql.js";

const customQuery = async (query, params) => {
  const result = await db.query(query, params);
  return result;
};

export const checkUserExists = async (username, email) => {
  try {
    const [rows] = await db.query(
      "SELECT id_user FROM tb_user WHERE username = ? OR email = ?",
      [username, email]
    );
    return rows.length > 0;
  } catch (error) {
    throw error;
  }
};

export default customQuery;
