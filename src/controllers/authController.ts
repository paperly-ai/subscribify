import { Request, Response } from 'express';
import * as authService from '../services/authService';

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  try {
    const tokens = await authService.login(email, password);
    res.status(200).json(tokens);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}

export async function refreshTokens(req: Request, res: Response): Promise<void> {
  try {
    const tokens = await authService.refreshTokens(req);
    res.status(200).json(tokens);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
