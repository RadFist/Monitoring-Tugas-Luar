import { getAllUsers, getAllUsersById } from "../model/userModel.js";
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

export const userId = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ error: "data not found" });
  }

  try {
    const response = {
      message: "Data user retrieved successfully",
      data: await getAllUsersById(id),
    };

    if (response.data < 1) {
      res.status(404).json({ error: "data not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
