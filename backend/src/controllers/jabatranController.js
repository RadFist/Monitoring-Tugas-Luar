import { getListJabatan } from "../model/jabatanModel.js";

export const allJabatan = async (req, res) => {
  try {
    const response = {
      message: "Data user retrieved successfully",
      data: await getListJabatan(),
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: " Internal Server Error, please try again later." });
  }
};
