import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

// More specific routes first
router.get("/users", protectRoute as any, getUsersForSidebar as any);

// Then parameterized routes
router.get("/:id([0-9a-fA-F]{24})", protectRoute as any, getMessages as any); // MongoDB ObjectId pattern
router.post(
  "/send/:id([0-9a-fA-F]{24})",
  protectRoute as any,
  sendMessage as any
);

export default router;
