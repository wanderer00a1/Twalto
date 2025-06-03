import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/users", protectRoute as any, getUsersForSidebar as any);
router.get("/:id", protectRoute as any, getMessages as any);
router.post("/send/:id", protectRoute as any, sendMessage as any);

export default router;
