import express from "express";
import {
  addToCart,
  updateCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addToCart);
router.put("/:id", verifyToken, updateCart);
router.delete("/:id", verifyToken, removeFromCart);

export default router;
