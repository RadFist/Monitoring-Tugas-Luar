import db from "../config/db_mysql.js";

export const getAllUsers = async () => {
  try {
    const [rows] = await db.query("SELECT username, email FROM tb_user");
    return rows;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export const getAllUsersById = async (id) => {
  try {
    const [rows] = await db.query(
      `SELECT username, email FROM tb_user WHERE id_user =  ?`,
      [id]
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};
