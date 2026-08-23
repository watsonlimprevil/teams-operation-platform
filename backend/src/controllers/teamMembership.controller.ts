import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const addUserToTeam = async(req:Request , res:Response) =>{
    try{
        const teamId = Number(req.params.teamId);
        const userId = Number(req.params.userId);
        const {role} = req.body;

        const membership = await prisma.userTeam.create({
            data:{
                teamId,
                userId,
                role: role || 'member'
            },
        });
        res.status(201).json(membership);
    }catch(error){
        res.status(500).json({message : 'Error addidng user'})
    }
}

export const removeUserFromTeam = async( req:Request , res: Response ) => {
    try{
        const teamId = Number(req.params.teamId);
        const userId = Number(req.params.userId);

        await prisma.userTeam.deleteMany({
            where : { teamId , userId},
        });

        res.json({message : 'user removed from team'});
    }catch(error){
        res.status(500).json({message : 'Error removing user'})
    }
};

export const getTeamUsers = async(req:Request , res:Response) =>{
    try{
        const teamId = Number(req.params.teamId);

        const users = await prisma.userteam.findMany({
            where : { teamId},
            include:{
                user: true
            },
        });

        res.json(users)
    }catch(error){
        res.status(500).json({message : 'Error fetching team users'})
    }
};

export const updateUserRole = async(req:Request , res:Response) =>{
    try{
        const teamId = Number(req.params.teamId);
        const userId = Number(req.params.userId);
        const {role} = req.body;

        const updated = await prisma.userTeam.updateMany({
            where : { teamId , userId},
            data :{role},
        })

        res.json({message : 'Role updated ' , updated})
    }catch(error){
        res.status(500).json({message :'Error updating userRoles'})
    }
}