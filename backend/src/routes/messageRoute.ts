import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/users", protectRoute as any, getUsersForSidebar as any);

// Add parameter validation middleware
const validateId = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id } = req.params;
  if (!id || id.trim() === "") {
    return res.status(400).json({ error: "Invalid ID parameter" });
  }
  next();
};

router.get("/:id", validateId as any, protectRoute as any, getMessages as any);
router.post(
  "/send/:id",
  validateId as any,
  protectRoute as any,
  sendMessage as any
);

export default router;
