import express from "express";
const router = express.Router();
import * as loginControler from "../controllers/authControler.js";
import * as userControler from "../controllers/userControler.js";

// auth path route
//login route
router.get("/login", loginControler.login);

//get user
router.get("/users", userControler.user);
router.get("/users/:id", (req, ress) => {
  const id = req.params.id;
  ress.send(id);
});

//joking around, fixed latter
router.get("*", (req, ress) => {
  const response = {
    status: "400 fat face",
    message: "bad request you dipshit",
  };
  ress.status(400).json(response);
});
export default router;
