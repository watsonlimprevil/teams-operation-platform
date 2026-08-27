import { prisma } from "../prisma/client";
import { Request, Response } from "express";

export const getUserTeams = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const memberships = await prisma.teamMembership.findMany({
      where: { userId },
      include: { team: true }
    });

    const teams = memberships.map(m => m.team);

    res.json(teams);
  } catch (err) {
    console.error("Error loading teams:", err);
    res.status(500).json({ message: "Failed to load teams" });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { name } = req.body;

    const team = await prisma.team.create({
      data: { name }
    });

    // Add creator as admin
    await prisma.teamMembership.create({
      data: {
        teamId: team.id,
        userId,
        role: "admin"
      }
    });

    res.json(team);
  } catch (err) {
    console.error("Error creating team:", err);
    res.status(500).json({ message: "Failed to create team" });
  }
};


export const getTeamDetails = async(req:Request , res:Response) =>{
    try{
        const teamId = Number(req.params.teamId);

        const team =  await prisma.team.findUnique({
            where : {id : teamId}
        });

        const members = await prisma.teamMembership.findMany({
            where : {teamId},
            include : {user : true}
        });

        const projects = await prisma.project.findMany({
            where : {teamId}
        });

        res.json({
            team, 
            members,
            projects
        })
    }catch(error){
        console.error('Error loading team details', error)
    }
}