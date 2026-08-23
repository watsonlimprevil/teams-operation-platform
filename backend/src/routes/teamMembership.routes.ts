import { Router } from "express";
import {
  addUserToTeam,
  removeUserFromTeam,
  getTeamUsers,
  updateUserRole,
} from "../controllers/teamMembership.controller";

const router = Router();

// Add user to team
router.post("/:teamId/users/:userId", addUserToTeam);

// Remove user from team
router.delete("/:teamId/users/:userId", removeUserFromTeam);

// Get all users in a team
router.get("/:teamId/users", getTeamUsers);

// Update user role
router.put("/:teamId/users/:userId/role", updateUserRole);

export default router;
