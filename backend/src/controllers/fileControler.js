import { deleteMiddlewre } from "../middleware/uploadMiddleware.js";
import {
  postFoto,
  getFoto as foto,
  deleteFoto as delFot,
} from "../model/uploadModel.js";
import { io } from "../socket.js";

const PORT = process.env.PORT || 5000;
const DOMAIN = process.env.DOMAIN;

export const getFoto = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await foto(id);
    result.map((data) => {
      data.file_url = `http://${DOMAIN}:${PORT}/public/uploads/img/${data.file_url}`;
    });

    res.status(200).json({ massage: "success", data: result });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: " Internal Server Error, please try again later." });
  }
};

export const uploadFoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Tidak ada file yang diupload." });
    }
    const idTugas = req.body.id;
    const fileName = req.file.filename;
    await postFoto(idTugas, fileName);
    const fileUrl = `http://${DOMAIN}:${PORT}/public/uploads/img/${fileName}`;

    io.emit("foto", {
      message: "foto updated",
    });

    res.status(200).json({
      message: "Upload berhasil",
      filePath: fileUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "Gagal upload file",
    });
  }
};

export const deleteFoto = async (req, res) => {
  const { idTugas, pathName } = req.body;
  const fileName = pathName.split("/").pop();

  try {
    await delFot(idTugas, fileName);
    deleteMiddlewre(fileName);

    io.emit("foto", {
      message: "foto deleted",
    });

    res.status(200).json({ massage: "success" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: " Internal Server Error, please try again later." });
  }
};
