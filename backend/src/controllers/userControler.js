import { getAllUsers } from "../model/userModel.js";
export const user = async (req, res) => {
  try {
    const response = {
      message: "Data user retrieved successfully",
      data: await getAllUsers(),
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
