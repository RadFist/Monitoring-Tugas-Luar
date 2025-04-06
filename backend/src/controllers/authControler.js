import { v4 as uuidv4 } from "uuid";
import * as auth from "../model/authModel.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import query from "../model/model.js";
import jwt from "jsonwebtoken";

//secret key
const accesSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (payload) => {
  return jwt.sign(payload, accesSecret, { expiresIn: "15m" });
};
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, refreshSecret, { expiresIn: "7h" });
};

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

  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //get data
  const { username, password } = value;

  try {
    //get data from db
    const [data] = await auth.getLogin(username, password);
    //check data exist or not
    if (data < 1) {
      return res.status(401).json({ message: "Username or Email Not Found" });
    }
    // compare
    const passwordHass = data.password;
    const compare = await bcrypt.compare(password, passwordHass);
    if (!compare) {
      return res.status(401).json({ message: "wrong password" });
    }
    const payload = {
      id_user: data.id_user,
      username: data.username,
      email: data.email,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const response = {
      message: "login success",
      accessToken,
      refreshToken,
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
