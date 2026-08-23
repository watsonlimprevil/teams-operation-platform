import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireTeamRole } from "../middleware/role.middleware";
import {
  addUserToTeam,
  removeUserFromTeam,
  getTeamUsers,
  updateUserRole,
} from "../controllers/teamMembership.controller";

const router = Router();

// Add user to team (ADMIN ONLY)
router.post(
  "/:teamId/users/:userId",
  authMiddleware,
  requireTeamRole("admin"),
  addUserToTeam
);

// Remove user from team (ADMIN ONLY)
router.delete(
  "/:teamId/users/:userId",
  authMiddleware,
  requireTeamRole("admin"),
  removeUserFromTeam
);

// Get all users in a team (MEMBER OR ADMIN)
router.get(
  "/:teamId/users",
  authMiddleware,
  requireTeamRole("member"),
  getTeamUsers
);

// Update user role (ADMIN ONLY)
router.put(
  "/:teamId/users/:userId/role",
  authMiddleware,
  requireTeamRole("admin"),
  updateUserRole
);

export default router;
