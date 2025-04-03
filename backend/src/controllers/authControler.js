import { getLogin } from "../model/authModel.js";
export const login = async (req, res) => {
  try {
    const response = {
      message: "Data has been auth successfully",
      data: await getLogin(),
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
