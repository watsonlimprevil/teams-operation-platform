import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/client";

export const requireTeamRole = (role : 'admin' | 'member') =>{
    return async(req:Request , res:Response ,  next: NextFunction) =>{
        const userId = (req as any).user.userId;
        const teamId = Number(req.params.teamId);

        const memebership = await prisma.teamMembership.findFirst({
            where : {userId , teamId}
        });
        if(!memebership){
            return res.status(403).json({message : 'Not part of this team'})
        }

        if(memebership.role !== role){
            return res.status(403).json({message : 'Insufficient permissions'})
        }
        next();
    };
};