import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { checkUserExists } from "../model/model.js";
import dayjs from "dayjs";
import { schemaAdd, schemaEdit } from "../utils/schemaJoi.js";

import {
  deletUserById,
  getAllUsers,
  getUsersById,
  addingUser,
  editUser,
  getAllUsersWhereJabatan,
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
  try {
    //validateData
    const { error, value } = schemaAdd.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //get data
    const id = uuidv4();
    const { username, email, password, nip, nama, jabatan } = value;
    const level = value.level || "user";

    //get data from db
    const checkUser = await checkUserExists(username, email);

    if (checkUser) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    //hassing password
    const hashedPassword = await bcrypt.hash(password, 6);

    //stored data to db
    try {
      await addingUser(
        id,
        username,
        nama,
        hashedPassword,
        email,
        nip,
        level,
        jabatan
      );
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
      .status(201)
      .json({ message: "The user has been created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const userEdit = async (req, res) => {
  try {
    //get data and validate
    const dataUpdate = req.body;

    const { value, error } = schemaEdit.validate(dataUpdate); //validasi schema dari joi yang diambil dari import
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // return status 404 jika tidak ada di schema
    }
    //get datetime
    const updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const idUser = req.params.id;

    //array init
    const fields = []; // deklarasi array field apa saja yang akan dipatch
    const values = []; // deklarasi array value apa saja sesuai field yang akan dipatch

    // push data to array
    for (let key in dataUpdate) {
      fields.push(`${key} = ?`); //key dari req.body yang sudah disesuaikan dengan field db dipush satu satu ke arraynya
      values.push(dataUpdate[key]); // value yang dikirim dari body dimasukan satu satu ke array
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "update data is null" });
    }
    fields.push(`updated_at = ?`);
    values.push(updateTime);
    values.push(idUser);

    //check username or email
    if (value.username || value.email) {
      const checkUser = await checkUserExists(value.username, value.email);
      if (checkUser) {
        return res
          .status(409)
          .json({ message: "Username or email already exists" });
      }
    }

    const queryField = `${fields.join(", ")}`;

    //send data to db
    await editUser(queryField, values);

    return res.status(200).json({ message: "update success" });
  } catch (error) {
    console.log(error.message);
    if (error.message === "user not found") {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const userDelete = async (req, res) => {
  const idData = req.params.id;
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

export const userWhereJabatan = async (req, res) => {
  const { id_jabatan } = req.body;
  try {
    const response = {
      message: "Data user retrieved successfully",
      data: await getAllUsersWhereJabatan(id_jabatan),
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: " Internal Server Error, please try again later." });
  }
};
