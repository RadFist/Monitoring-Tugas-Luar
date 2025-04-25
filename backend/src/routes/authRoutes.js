import express from "express";
const router = express.Router();
import * as authControler from "../controllers/authControler.js";

// create auth route
router.post("/regist", authControler.registration);
router.post("/login", authControler.login);

//auth token route
router.post("/auth/referesh", authControler.refereshTokenAuth);
router.post("/auth/logout", authControler.logout);

//favicon g jelas
router.get("/favicon.ico", (req, res) => res.status(204));
export default router;
