import { Request, Response } from "express";
import { prisma } from "../prisma/client";

// GET all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        user: true,
      },
    });
    res.json(tasks);
  } catch (error) {
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
      },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task" });
  }
};

// CREATE task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, projectId, assignedTo } = req.body;

    const newTask = await prisma.task.create({
      data: {
        title,
        projectId,
        assignedTo: assignedTo || null,
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
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
    res.status(500).json({ message: "Error deleting task" });
  }
};
