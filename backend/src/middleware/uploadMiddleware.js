import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadMiddleware = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../public/uploads/img")); // simpan di /src/uploads
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  return multer({ storage });
};

export const deleteMiddlewre = (fileName) => {
  const filePath = path.join(__dirname, "../../public/uploads/img", fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Gagal menghapus file:", err);
      return res.status(500).json({ message: "Gagal menghapus file." });
    }
  });
};
