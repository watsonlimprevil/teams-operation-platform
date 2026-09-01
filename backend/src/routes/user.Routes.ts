import { Router } from "express";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getPersonalProfile,
} from "../controllers/user.contoller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getUsers);
router.get("/me", authMiddleware, getPersonalProfile);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
