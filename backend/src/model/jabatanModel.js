import db from "../config/db_mysql.js";

export const getListJabatan = async () => {
  try {
    const [rows] = await db.query("SELECT * from tb_jabatan");
    return rows;
  } catch (error) {
    throw new Error("Error fetching list Jabatan: " + error.message);
  }
};
