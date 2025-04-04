import express from "express";
const router = express.Router();
import * as authControler from "../controllers/authControler.js";
import * as userControler from "../controllers/userControler.js";

// auth path route
router.post("/register", authControler.registration);
router.post("/login", authControler.login);

//get user
router.get("/users", userControler.user);
router.get("/users/:id", userControler.userId);

//joking around, fixed latter
router.get("*", (req, ress) => {
  const response = {
    status: "400 fat face",
    message: "bad request you dipshit",
  };
  ress.status(400).json(response);
});

//favicon g jelas
router.get("/favicon.ico", (req, res) => res.status(204));
export default router;
