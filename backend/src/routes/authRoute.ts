import express from "express.js";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup as any);

router.post("/login", login as any);

router.post("/logout", logout);

router.put("/update-profile", protectRoute as any, updateProfile as any);

router.get("/check", protectRoute as any, checkAuth as any);

export default router;
