const jwt = require("jsonwebtoken");
const { isTokenBlacklisted, verifyToken } = require("../services/authService");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ error: "Token has been invalidated" });
  }

  const { valid, decoded, error } = verifyToken(token);

  if (!valid) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = decoded;
  next();
};

module.exports = authMiddleware;
