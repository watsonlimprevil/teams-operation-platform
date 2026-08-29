import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshTokenHandler,
  logoutUser,
  getMe
} from "../controllers/auth.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Refresh token (public because access token may be expired)
router.post("/refresh", refreshTokenHandler);

// Protected routes
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, getMe);

export default router;
