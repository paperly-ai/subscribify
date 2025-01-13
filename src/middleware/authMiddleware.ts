import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/jwtService';

export async function authMiddleWare(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Access token not provided' });
      return;
    }

    const decodedToken = await verifyAccessToken(token);
    res.locals.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
}
