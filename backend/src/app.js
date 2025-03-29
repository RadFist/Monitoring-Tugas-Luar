import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//declaration
const PORT = process.env.PORT || 5000;

//loging request don't forget to delete
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} `);
  next();
});

// Routes
app.use(routes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
