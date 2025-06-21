import express from "express";
import authenticateToken, { authRole } from "../middleware/authMiddleware.js";
import { uploadMiddleware } from "../middleware/uploadMiddleware.js";
import * as userControler from "../controllers/userControler.js";
import { allJabatan } from "../controllers/jabatranController.js";
import {
  inputPenugasan,
  listTugas,
  listTugasPegawai,
  detailTugas,
  approveTugas,
  getArsip,
} from "../controllers/tugasLuarController.js";
import { getNotifIdUser } from "../controllers/notifControler.js";
import {
  deleteFoto,
  getFoto,
  uploadFoto,
} from "../controllers/fileControler.js";
import {
  approveLaporan,
  deleteRincianDana,
  getLaporan,
  getRincianDana,
  laporPdf,
  patchLaporan,
  patcRincianDana,
  postLaporan,
  postRincianDana,
} from "../controllers/laporanControler.js";

const router = express.Router();
const authCamat = [authenticateToken, authRole("camat")];
const authSuperAdmin = [authenticateToken, authRole("super admin")];
//======User Route======
//get
router.get("/users", authenticateToken, userControler.allUser);
router.get("/user/:id", authenticateToken, userControler.userId);
//post
router.post("/user/add", authSuperAdmin, userControler.addUser);
//patch
router.patch("/user/edit/:id", authSuperAdmin, userControler.userEdit);
//delete
router.delete("/user/delete/:id", authSuperAdmin, userControler.userDelete);

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
router.get("/tugas/approval", authCamat, listTugas);
router.get("/user/tugas/:id", listTugasPegawai);
router.get("/tugas/detail/:id", detailTugas);

//post
router.post("/PenugasanTugasLuar", authenticateToken, inputPenugasan);

//patch
router.patch("/PenugasanTugasLuar/Approve", authCamat, approveTugas);

//======Notif Route======
router.get("/notification/:id", getNotifIdUser);

//======Laporan Route======
router.get("/laporan/rincian/:id", authenticateToken, getRincianDana);
router.post("/laporan/rincian", postRincianDana);
router.patch("/laporan/rincian", patcRincianDana);
router.delete("/laporan/rincian", deleteRincianDana);

router.post("/laporan/approve/:id", authCamat, approveLaporan);
router.get("/laporan/generate/:id", laporPdf);

router.get("/laporan/:id", authenticateToken, getLaporan);
router.post("/laporan/:id", authenticateToken, postLaporan);
router.patch("/laporan/:id", authenticateToken, patchLaporan);

//======upload Route======
const upload = uploadMiddleware();
router.get("/documentation/:id", getFoto);
router.post("/documentation", upload.single("foto"), uploadFoto);
router.delete("/documentation", deleteFoto);

//======Arsip Route======
router.get("/arsip", getArsip);

//======not found route======
router.all("*", (req, res) => {
  return res.status(404).json({
    message: `Route ${req.originalUrl} with method ${req.method} not found.`,
  });
});

export default router;
