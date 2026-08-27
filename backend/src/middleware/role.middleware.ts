import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/client";
export const requireTeamRole = (role: "admin" | "member") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.userId;
    const teamId = Number(req.params.teamId);

    const membership = await prisma.teamMembership.findFirst({
      where: { userId, teamId },
    });

    if (!membership) {
      return res.status(403).json({ message: "Not part of this team" });
    }

    if (membership.role !== role) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  };
};
