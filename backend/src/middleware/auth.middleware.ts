import { Request , Response , NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req:Request , res:Response , next: NextFunction) =>{
    const header = req.headers.authorization;

    if(!header) return res.status(401).json({message : 'no token provided'});

    const token = header.split(' ')[1];
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        (req as any).user = decoded;
        next()
    }catch(error){
        res.status(401).json({message : 'Invalide token'})
    }
}