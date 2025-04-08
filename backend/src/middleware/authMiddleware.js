import jwt from "jsonwebtoken";

const accesSecret = process.env.ACCESS_TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "token mot found" });

  jwt.verify(token, accesSecret, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.log("Token sudah expired!");
        return res.status(403).json({ message: "token expired" });
      }
      console.log("message : " + err.message);
      return res.status(403).json({ message: "forbiden, token not match" });
    }

    req.custom = { user: decoded };
    // console.log(req.custom);
    // console.log("user: " + JSON.stringify(req.user));

    next();
  });
};

export default authenticateToken;
