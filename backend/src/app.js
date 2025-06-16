import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import apiRoute from "./routes/apiRoute.js";
import http from "http";

//import untuk upload
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import initSocket from "./socket.js"; // import file soket io for realtime

//path for upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const allowedOrigins = ["http://localhost:5050", "http://localhost:5173"];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // supaya cookie bisa dikirim
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//declaration
const PORT = process.env.PORT || 5000;

//loging request don't forget to delete
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} `);
  next();
});

// cookies midleware
app.use(cookieParser());

//upload kedalam fd img
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../src/upload/img")); // simpan di /src/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes

// route upload
app.post("/upload", upload.single("foto"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Tidak ada file yang diupload." });
    }
    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
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
});

app.use(authRoutes);
app.use(apiRoute);
// ==========================
// SOCKET.IO SETUP
// ==========================

const server = http.createServer(app);

initSocket(server, allowedOrigins);

// Server
// app.listen(PORT, () => {
//   console.log(`Server running on  http://localhost:${PORT}`);
// });

//server sooket
server.listen(PORT, () => {
  console.log(`Server soket.io running on  http://localhost:${PORT}`);
});
