import { v4 as uuidv4 } from "uuid";
import * as auth from "../model/authModel.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import query from "../model/model.js";

const schema = Joi.object({
  username: Joi.string().alphanum().min(1).max(40),
  password: Joi.string().min(8).required(),
  email: Joi.string().email(),
});

export const registration = async (req, res) => {
  const id = uuidv4();
  try {
    //validateData
    const registSchema = schema.fork(
      ["username", "password", "email"],
      (field) => field.required()
    );
    const { error, value } = registSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //get data
    const { username, email, password } = value;

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
    res
      .status(500)
      .json({ message: "Internal Server Error, please try again later." });
  }
};

export const login = async (req, res) => {
  /* belum di intergasi jwt */
  const loginSchema = schema.keys({
    username: Joi.string().min(3).max(30).required(), // tanpa alphanum
  });
  //validate data
  // const loginSchema = schema.fork(["username", "password"], (field, key) => {
  //   if (key === "username") {
  //     return Joi.string().min(1).max(40).required();
  //   }
  //   return field.required();
  // });

  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //get data
  const { username, password } = value;
  const secret = process.env.REFRESH_TOKEN_SECRET;

  try {
    //get data from db

    const data = await auth.getLogin(username, password);
    //check data exist or not
    if (data < 1) {
      return res.status(401).json({ message: "Username or Email Not Found" });
    }

    // compare
    const passwordHass = data[0].password;
    const compare = await bcrypt.compare(password, passwordHass);
    if (!compare) {
      return res.status(401).json({ message: "wrong password" });
    }
    const response = {
      message: "Data has been auth successfully",
    };

    //response
    return res.status(200).json(response);

    //json structure
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error, please try again later." });
  }
};
