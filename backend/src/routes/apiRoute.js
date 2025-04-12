import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import * as userControler from "../controllers/userControler.js";
const router = express.Router();

//user route

//get
router.get("/users", authenticateToken, userControler.allUser);
router.get("/user/:id", authenticateToken, userControler.userId);
//post
router.post("/user/add", authenticateToken, userControler.addUser);

//patch
// router.patch("/user/update:id", authenticateToken, userControler.userEdit);
router.patch("/user/edit/:id", userControler.userEdit);
//delete
router.delete("/user/delete/:id", authenticateToken, userControler.userDelete);

//testing
router.get("/dashboard", authenticateToken, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.username}` });
});
// testing end

//joking around, fixed latter
router.get("*", (req, ress) => {
  const response = {
    status: "400",
    message: "service not found",
  };
  ress.status(400).json(response);
});
//refactor later
router.post("*", authenticateToken, (req, ress) => {
  const response = {
    status: "200",
    message: "success",
    data: req.custom.user,
  };
  ress.status(200).json(response);
});

export default router;
