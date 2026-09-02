import { Request, Response } from "express";
import { prisma } from "../prisma/client";

// GET all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        user: true,
        team: true,
      },
    });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// GET task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        project: true,
        user: true,
        team: true,
      },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    console.error("Error fetching task", error);
    res.status(500).json({ message: "Error fetching task" });
  }
};

// CREATE task (basic)
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, projectId, assignedTo, teamId } = req.body;

    const newTask = await prisma.task.create({
      data: {
        title,
        projectId: Number(projectId),
        assignedTo: assignedTo || null,
        teamId: Number(teamId),
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task", error);
    res.status(500).json({ message: "Error creating task" });
  }
};

// UPDATE task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, completed, assignedTo } = req.body;

    const updated = await prisma.task.update({
      where: { id },
      data: {
        title,
        completed,
        assignedTo: assignedTo || null,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating task", error);
    res.status(500).json({ message: "Error updating task" });
  }
};

// DELETE task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.task.delete({ where: { id } });

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task", error);
    res.status(500).json({ message: "Error deleting task" });
  }
};

// GET tasks by project
export const getTasksByProject = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.projectId);

    const tasks = await prisma.task.findMany({
      where: { projectId },
      orderBy: { id: "desc" },
    });

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching project tasks", error);
    res.status(500).json({ message: "Error fetching project tasks" });
  }
};

// CREATE Kanban task
export const createKanbanTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, projectId, teamId } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "pending",
        projectId: Number(projectId),
        teamId: Number(teamId),
      },
    });

    res.json(task);
  } catch (error) {
    console.error("Error creating kanban task", error);
    res.status(500).json({ message: "Error creating kanban task" });
  }
};

// UPDATE task status
export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: { status },
    });

    res.json(task);
  } catch (error) {
    console.error("Error updating task status", error);
    res.status(500).json({ message: "Error updating task status" });
  }
};

// RENAME task
export const renameTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: { title },
    });

    res.json(task);
  } catch (error) {
    console.error("Error renaming task", error);
    res.status(500).json({ message: "Error renaming task" });
  }
};
