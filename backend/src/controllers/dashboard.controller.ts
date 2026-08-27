import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    // Get all teams the user belongs to
    const memberships = await prisma.teamMembership.findMany({
      where: { userId },
      include: {
        team: true,
      },
    });

    const teamIds = memberships.map(m => m.teamId);

    // Get all projects for those teams
    const projects = await prisma.project.findMany({
      where: {
        teamId: { in: teamIds },
      },
    });

    const projectIds = projects.map(p => p.id);

    // Get all tasks for those projects
    const tasks = await prisma.task.findMany({
      where: {
        projectId: { in: projectIds },
      },
    });

    res.json({
      teams: memberships,
      projects,
      tasks,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};
