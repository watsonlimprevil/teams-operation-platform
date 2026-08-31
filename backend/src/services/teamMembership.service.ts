import { prisma } from "../prisma/client";

export const addUserToTeamService = async (teamId: number, userId: number) => {
  return prisma.teamMembership.create({
    data: {
      teamId,
      userId,
      role: "member",
    },
  });
};

export const removeUserFromTeamService = async (
  teamId: number,
  userId: number,
) => {
  return prisma.teamMembership.deleteMany({
    where: { teamId, userId },
  });
};

export const getTeamUsersService = async (teamId: number) => {
  return prisma.teamMembership.findMany({
    where: { teamId },
    include: { user: true },
  });
};

export const updateUserRoleService = async (
  teamId: number,
  userId: number,
  role: string,
) => {
  return prisma.teamMembership.updateMany({
    where: { teamId, userId },
    data: { role },
  });
};
