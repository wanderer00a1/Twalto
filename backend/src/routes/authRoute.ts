import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/authController";
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", signup as any);

router.post("/login", login as any);

router.post("/logout", logout);

router.put("/update-profile", protectRoute as any, updateProfile as any);

router.get("/check", protectRoute as any, checkAuth as any);

export default router;
