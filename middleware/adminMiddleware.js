// middleware/adminMiddleware.js
const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied: Admins only" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error("Admin Middleware Error:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = adminMiddleware;
