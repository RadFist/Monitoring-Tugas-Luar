import db from "../config/db_mysql.js";

const customQuery = async (query, params) => {
  const result = await db.query(query, params);
  return result;
};

export default customQuery;
