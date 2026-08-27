import { Request, Response } from "express";
import {
  addUserToTeamService,
  removeUserFromTeamService,
  getTeamUsersService,
  updateUserRoleService,
} from "../services/teamMembership.service";

export const addUserToTeam = async (req: Request, res: Response) => {
  const { teamId, userId } = req.params;

  const result = await addUserToTeamService(Number(teamId), Number(userId));
  res.json(result);
};

export const removeUserFromTeam = async (req: Request, res: Response) => {
  const { teamId, userId } = req.params; 

  const result = await removeUserFromTeamService(Number(teamId), Number(userId));
  res.json(result);
};

export const getTeamUsers = async (req: Request, res: Response) => {
  const { teamId } = req.params;

  const result = await getTeamUsersService(Number(teamId));
  res.json(result);
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { teamId, userId } = req.params;
  const { role } = req.body;

  const result = await updateUserRoleService(Number(teamId), Number(userId), role);
  res.json(result);
};
