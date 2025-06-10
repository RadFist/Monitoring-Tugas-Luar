import express from "express";
import authenticateToken, { authRole } from "../middleware/authMiddleware.js";
import * as userControler from "../controllers/userControler.js";
import { allJabatan } from "../controllers/jabatranController.js";
import {
  inputPenugasan,
  listTugas,
  listTugasPegawai,
  detailTugas,
  approveTugas,
} from "../controllers/tugasLuarController.js";

const router = express.Router();

//======User Route======
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

// ======jabatan Route======
// get
router.get("/Jabatan", allJabatan);
//post
router.post(
  "/users/jabatan",
  authenticateToken,
  userControler.userWhereJabatan
);

//======Tugas Route======
//get
router.get("/allTugas", authenticateToken, listTugas);

router.get(
  "/allTugas/approval",
  authenticateToken,
  authRole("camat"),
  listTugas
);
router.get("/tugas/:id", listTugasPegawai);
router.get("/Detail-Penugasan/:id", detailTugas);
//post
router.post("/PenugasanTugasLuar", authenticateToken, inputPenugasan);
router.patch("/PenugasanTugasLuar/Approve", approveTugas);

//next route

//======not found route======
router.all("*", (req, res) => {
  return res.status(404).json({
    message: `Route ${req.originalUrl} with method ${req.method} not found.`,
  });
});
export default router;
