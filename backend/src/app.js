import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//loging request don't forget to delete
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} `);
  next();
});

// Routes
app.use(routes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
