import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user data from JWT to the request object for user-specific operations
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(400).json({ message: "Invalid token." });
  }
};

export { verifyToken };
