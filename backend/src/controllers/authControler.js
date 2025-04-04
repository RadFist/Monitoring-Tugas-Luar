import { v4 as uuidv4 } from "uuid";
import * as auth from "../model/authModel.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import query from "../model/model.js";

const registSchema = Joi.object({
  username: Joi.string().alphanum().min(1).max(40).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});
const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(1).max(40).required(),
  password: Joi.string().min(8).required(),
});

export const registration = async (req, res) => {
  const id = uuidv4();
  try {
    //validateData
    const { error } = registSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //get data
    const { username, email, password } = req.body;

    //get data from db
    const [existingUser] = await query(
      "SELECT id_user FROM tb_user WHERE username = ? OR email = ?",
      [username, email]
    );

    //check data alredy exists or not
    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    //hassing password
    const hashedPassword = await bcrypt.hash(password, 6);

    //stored data to db
    await auth.register(id, username, hashedPassword, email);
    return res.status(200).json({ message: "data stored succesfully" });
  } catch (error) {
    console.error("Registration Error:", error);

    res.status(500).json({ message: "internal server error " + error.message });
  }
};

export const login = async (req, res) => {
  /* belum di intergasi jwt */
  //validate data
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //get data
  const { username, password } = req.body;
  const secret = process.env.REFRESH_TOKEN_SECRET;

  try {
    //get data from db
    const data = await auth.getLogin(username, password);
    //check data exist or not
    if (data < 1) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    //json structure
    const response = {
      message: "Data has been auth successfully",
      data: data,
    };

    //response
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
