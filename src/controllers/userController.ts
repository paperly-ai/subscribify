import { Request, Response } from 'express';
import * as userService from '../services/userService';
import user from '../models/user';

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    console.log("herp")
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const userId = res.locals.user.userId;
    await userService.deleteUser(userId);
    res.status(204).end();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
