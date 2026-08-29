import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByProject,
  createKanbanTask,
  updateTaskStatus,
  renameTask
} from "../controllers/task.controller";

const router = Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get('/projects/:projectId', getTasksByProject);
router.post('/kanban', createKanbanTask);
router.put('/:id/status' , updateTaskStatus)

export default router;
