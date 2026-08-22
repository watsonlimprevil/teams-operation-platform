import { Request, Response } from "express";
import { prisma } from "../prisma/client";

// READ ALL
export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// READ ONE
export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};

// CREATE
export const createUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  const newUser = await prisma.user.create({
    data: { email, name },
  });

  res.status(201).json(newUser);
};

// UPDATE
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { email, name } = req.body;

  const updated = await prisma.user.update({
    where: { id },
    data: { email, name },
  });

  res.json(updated);
};

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await prisma.user.delete({ where: { id } });

  res.json({ message: "User deleted" });
};
