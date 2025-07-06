import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import apiRoute from "./routes/apiRoute.js";
import http from "http";

import initSocket from "./socket.js"; // import file soket io for realtime

const app = express();

//declaration
const PORT = process.env.PORT || 5000;
const DOMAIN = process.env.DOMAIN || "localhost";

const allowedOrigins = [
  "http://localhost:5050",
  "http://localhost:5173",
  `http://${DOMAIN}:5050`,
  `http://${DOMAIN}:5173`,
];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // console.log("CORS request from:", origin);
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

//loging request don't forget to delete
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} `);
  next();
});

app.use("/public", express.static("public"));
// app.use("/img", express.static(path.join(__dirname, "../public"))); //agar publik bisa akses directory

// cookies midleware
app.use(cookieParser());

// Routes
app.use(authRoutes);
app.use(apiRoute);

// ==========================
// SOCKET.IO SETUP
// ==========================

const server = http.createServer(app);

initSocket(server, allowedOrigins); // cors soket and start

//server
server.listen(PORT, () => {
  console.log(`Server soket.io running on  http://${DOMAIN}:${PORT}`);
});
