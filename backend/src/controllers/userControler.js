import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import query from "../model/model.js";
import {
  deletUserById,
  getAllUsers,
  getUsersById,
  addingUser,
} from "../model/userModel.js";

export const allUser = async (req, res) => {
  try {
    const response = {
      message: "Data user retrieved successfully",
      data: await getAllUsers(),
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: " Internal Server Error, please try again later." });
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
      data: await getUsersById(id),
    };

    if (response.data < 1) {
      res.status(404).json({ error: "data not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error, please try again later." });
  }
};

export const addUser = async (req, res) => {
  const userLevel = req.custom.user.level;

  if (userLevel != "super admin") {
    return res.status(403).json({ message: "Access denied." });
  }

  const registSchema = Joi.object({
    username: Joi.string().alphanum().min(1).max(40).required(),
    password: Joi.string().min(8).required().required(),
    email: Joi.string().email().required(),
    level: Joi.string(),
  });

  try {
    //validateData
    const { error, value } = registSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //get data
    const id = uuidv4();
    const { username, email, password } = value;
    const level = value.level || "admin";

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
    try {
      await addingUser(id, username, hashedPassword, email, level);
    } catch (error) {
      console.log(error.message);
      if ((error.message ?? "").toLowerCase().includes("adding")) {
        return res.status(400).json({
          message: error.message,
        });
      }
      throw error;
    }

    return res
      .status(200)
      .json({ message: "The user has been created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const userEdit = (req, res) => {};

export const userDelete = async (req, res) => {
  const idData = req.params.id;
  const userLevel = req.custom.user.level;

  if (userLevel != "super admin") {
    return res.status(403).json({ message: "Access denied." });
  }

  try {
    await deletUserById(idData);
  } catch (error) {
    console.log(error.message);
    if ((error.message ?? "").toLowerCase().includes("not found")) {
      return res.status(400).json({
        message: error.message,
      });
    } else {
      return res.status(500).json({
        message: "internal server error",
      });
    }
  }

  return res.status(200).json({ message: "delete success" });
};
