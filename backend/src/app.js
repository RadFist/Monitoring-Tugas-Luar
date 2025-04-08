import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import apiRoute from "./routes/apiRoute.js";
const app = express();

//
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

// Routes
app.use(authRoutes);
app.use(apiRoute);

// Server
app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
