import { Request , Response , NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface JwtUserPayload {
  userId: number;
}

export const authMiddleware = (req:Request , res:Response , next: NextFunction) =>{
    const header = req.headers.authorization;

    if(!header) return res.status(401).json({message : 'no token provided'});

    const token = header.split(' ')[1];

    if(!process.env.JWT_SECRET){
        throw new Error('jwt secret not set');
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET) as JwtUserPayload;
        (req as any).user = decoded;
        next();
    }catch(error){
        res.status(401).json({message : 'Invalid token'});
    }
}
