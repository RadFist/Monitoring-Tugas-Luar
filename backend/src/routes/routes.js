import express from "express";
const router = express.Router();
import * as loginControler from "../controllers/authControler.js";
import * as userControler from "../controllers/userControler.js";
// login
router.get("/", (req, ress) => {
  ress.send("Server OK");
});

//get user
router.get("/users", userControler.user);

router.get("/users/:id", (req, ress) => {
  const id = req.params.id;
  ress.send(id);
});

router.get("/login", loginControler.login);

export default router;
