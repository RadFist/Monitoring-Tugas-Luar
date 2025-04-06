import express from "express";
const router = express.Router();
import * as authControler from "../controllers/authControler.js";
import * as userControler from "../controllers/userControler.js";

// auth path route
router.post("/regist", authControler.registration);
router.post("/login", authControler.login);

//get user
// router.get("/users", userControler.user);
// router.get("/users/:id", userControler.userId);

//favicon g jelas
router.get("/favicon.ico", (req, res) => res.status(204));
export default router;
