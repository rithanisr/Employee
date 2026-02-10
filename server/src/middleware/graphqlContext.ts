import { Request, Response } from 'express';
import { authMiddleware } from './auth';


interface AuthenticatedRequest extends Request {
  user?: any;
  isAuth: boolean;
}

export const createContext = async ({ req }: { req: AuthenticatedRequest }) => {
  await authMiddleware(req, {} as Response, () => { });
  return { user: req.user };
};
