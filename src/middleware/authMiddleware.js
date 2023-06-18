const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET || "secret_key", (err) => {
      if (err) {
        return res.status(403).json({ message: "Not Authenticated ", err });
      }
      next();
    });
  } else {
    return res.status(401).json({ message: "Not Authenticated ", err });
  }
};

module.exports = authMiddleware;
