import express from "express";
import authenticateToken, { authRole } from "../middleware/authMiddleware.js";
import * as userControler from "../controllers/userControler.js";
import { allJabatan } from "../controllers/jabatranController.js";
import {
  inputPenugasan,
  listTugas,
} from "../controllers/tugasLuarController.js";

const router = express.Router();

//======user route======
//get
router.get("/users", authenticateToken, userControler.allUser);
router.get("/user/:id", authenticateToken, userControler.userId);
//post
router.post(
  "/user/add",
  authenticateToken,
  authRole("super admin"),
  userControler.addUser
);
//patch
router.patch(
  "/user/edit/:id",
  authenticateToken,
  authRole("super admin"),
  userControler.userEdit
);
//delete
router.delete(
  "/user/delete/:id",
  authenticateToken,
  authRole("super admin"),
  userControler.userDelete
);

// ======jabatan rote======
// get
router.get("/Jabatan", allJabatan);
//post
router.post(
  "/users/jabatan",
  authenticateToken,
  userControler.userWhereJabatan
);

//======Tugas======
//get
router.get("/allTugas", authenticateToken, listTugas);
//post
router.post("/PenugasanTugasLuar", authenticateToken, inputPenugasan);

//next route

//testing
router.get("/dashboard", authenticateToken, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.username}` });
});

//testing for home
router.post("/asalGamink", authenticateToken, (req, res) => {
  const data = req.custom.user;
  return res.status(200).json({
    message: `okeh `,
    data: data,
  });
});
// testing end

//======not found route======
router.all("*", (req, res) => {
  return res.status(404).json({
    message: `Route ${req.originalUrl} with method ${req.method} not found.`,
  });
});
export default router;
