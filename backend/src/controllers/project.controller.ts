import { Request, Response } from "express";
import { prisma } from "../prisma/client";;

// GET all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { team: true, tasks: true },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// GET project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const project = await prisma.project.findUnique({
      where: { id },
      include: { team: true, tasks: true },
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project" });
  }
};

// CREATE project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, teamId } = req.body;

    if (!teamId) {
      return res.status(400).json({ message: "teamId is required" });
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId }
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const newProject = await prisma.project.create({
      data: { name, teamId }
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Error creating project" });
  }
};


// UPDATE project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const updated = await prisma.project.update({
      where: { id },
      data: { name },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating project" });
  }
};

// DELETE project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.project.delete({ where: { id } });

    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project" });
  }
};
