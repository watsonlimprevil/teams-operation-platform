import { Request , Response , NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface JwtUserPayload {
  userId: number;
  role:string
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;

  if (!token) return res.status(401).json({ message: "No token provided" });

  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT access secret not set");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as JwtUserPayload;
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
