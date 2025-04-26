import { v4 as uuidv4 } from "uuid";
import { checkUserExists } from "../model/model.js";
import * as auth from "../model/authModel.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//secret key
const accesSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (payload) => {
  return jwt.sign(payload, accesSecret, { expiresIn: "15m" });
  // return jwt.sign(payload, accesSecret, { expiresIn: "10000" });
};
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, refreshSecret, { expiresIn: "7h" });
  // return jwt.sign(payload, refreshSecret, { expiresIn: "10000" });
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
    const checkUser = await checkUserExists(username, email);

    if (checkUser) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    //hassing password
    const hashedPassword = await bcrypt.hash(password, 6);

    console.log(`${id} ${username} ${hashedPassword} ${email}`);

    //stored data to db
    await auth.register(id, username, hashedPassword, email);

    return res.status(200).json({ message: "data stored succesfully" });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error, please try again later." });
  }
};

export const login = async (req, res) => {
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
    const [data] = await auth.getLogin(username);

    //check data exist or not

    if (!data || data < 1) {
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
      level: data.level,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    //simpan ke cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true, //buat production kocak kocak
      // sameSite: "Strict", //buat 1 domain
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // maxAge: 10000, //debug only
    });

    const response = {
      message: "login success",
      accessToken,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error, please try again later." });
  }
};

export const refereshTokenAuth = (req, res) => {
  const refresToken = req.cookies.refreshToken;
  jwt.verify(refresToken, refreshSecret, (err, decoded) => {
    if (!err) {
      const payload = {
        id_user: decoded.id_user,
        username: decoded.username,
        email: decoded.email,
        level: decoded.level,
      };
      const token = generateAccessToken(payload);

      return res.status(200).json({ message: "Refreshed", token: token });
    }
    return res.status(401).json({ message: "token expired" });
  });
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    // secure: true, // buat production kocak kocak
    // sameSite: "Strict", //buat 1 domain
  });
  res.status(200).json({ message: "logout success" });
};
