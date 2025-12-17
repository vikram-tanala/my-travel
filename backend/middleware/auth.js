import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // No Authorization header
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = payload;

    next(); // ✅ only reached if everything is valid
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;
