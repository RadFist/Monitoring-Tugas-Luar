import db from "../config/db_mysql.js";

export const getAllJabatan = async () => {
  try {
    const [rows] = await db.query("SELECT * from tb_jabatan");
    return rows;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};
