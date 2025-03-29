import express from "express";
const router = express.Router();

// login
router.get("/", (req, ress) => {
  ress.send("Server OK");
});

//get user
router.get("/users", (req, ress) => {
  ress.send("OK");
});
router.get("/users/:id", (req, ress) => {
  const id = req.params.id;
  ress.send(id);
});

console.log(process.env.PORT);

export default router;
