const jwt = require("jsonwebtoken");

const User = require("../models/users.model");

const authMiddleware = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader != "undefined") {
      const token = bearerHeader.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.token = user;
      next();
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = authMiddleware;
