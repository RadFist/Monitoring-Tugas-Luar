import jwt from "jsonwebtoken";

const accesSecret = process.env.ACCESS_TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "token mot found" });

  jwt.verify(token, accesSecret, (err, decoded) => {
    if (err) {
      console.log("message : " + err.message);
      return res.status(403).json({ message: "forbiden, token not match" });
    }
    req.user = decoded;

    // console.log(decoded);
    // console.log("user: " + JSON.stringify(req.user));
  });

  next();
};

export default authenticateToken;
