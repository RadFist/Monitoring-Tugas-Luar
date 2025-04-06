import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import apiRoute from "./routes/apiRoute.js";
const app = express();

//db

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//declaration
const PORT = process.env.PORT || 5000;

//loging request don't forget to delete
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} `);
  next();
});

// Routes
app.use(authRoutes);
app.use(authRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
