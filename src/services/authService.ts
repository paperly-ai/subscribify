// authService.ts
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user';
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from './jwtService';
import * as userService from './userService';

export async function login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
}

export async function signup(userData: IUser): Promise<{ accessToken: string; refreshToken: string }> {
  try {

    const user = await userService.createUser(userData);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
}



export async function refreshTokens(req: Request): Promise<{ accessToken: string; refreshToken: string }> {
  try {
    const { refreshToken } = req.body;
    await verifyRefreshToken(refreshToken);
    const decoded: any = jwt.decode(refreshToken);
    const userId = decoded?.userId;
    const user = await User.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    const accessToken = generateAccessToken(user);
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
}
