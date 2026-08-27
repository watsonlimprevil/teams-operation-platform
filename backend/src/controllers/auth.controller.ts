import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client";


export const registerUser = async (req: Request, res: Response) => {
  try{
    const { email , password , name } = req.body;

    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await prisma.user.create({
        data:{
            email,
            password: hashedPassword,
            name
        }
    });

    res.status(201).json({message : 'User Registered', user})
  }catch(error){
    res.status(500).json({message : 'Error Registering user'})
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try{
    const { email , password} = req.body;

    const user = await prisma.user.findUnique({
        where : { email},
    });

    if(!user) return res.status(400).json({message : 'Invalid Credentials'});

    const isMatch = await bcrypt.compare(password , user.password);

    if(!isMatch) return res.status(400).json({message : 'Invalid credentials'});

    if(!process.env.JWT_SECRET){
      throw new Error('jwt secret not set')
    }
    const token = jwt.sign(
        {userId : user.id},
        process.env.JWT_SECRET,
        {expiresIn : '7d'}
    );

    res.json({message : 'Login successful' , token})
  }catch(error){
    res.status(500).json({message :  'Error logging in'})
  }
};
