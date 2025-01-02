
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import { AuthenticationError } from 'apollo-server-express';

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (req: AuthRequest, _: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Allow unauthenticated requests to proceed
    }

    const token = authHeader.split(' ')[1];
    if (!token) return next();

    const decoded = jwt.verify(token, "Jwt_key") as { userId: string };
    const user = await User.findById(decoded.userId).select('-password');
    if (user) {
      req.user = user;
    }
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    next();
  }
};
