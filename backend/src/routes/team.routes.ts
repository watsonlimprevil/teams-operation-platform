import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUserTeams, createTeam , getTeamDetails} from "../controllers/team.controller";

const router = Router();

// Get all teams the logged-in user belongs to
router.get("/", authMiddleware, getUserTeams);
router.get("/:teamId", authMiddleware, getTeamDetails);

// Create a new team
router.post("/", authMiddleware, createTeam);

export default router;
