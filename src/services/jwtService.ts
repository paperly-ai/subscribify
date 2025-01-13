import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/user';

const accessTokenSecret = process.env.JWT_SECRET as string;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET as string;
const expiryTime = process.env.EXPIRY_TIME
const refreshExpiryTime = process.env.REFRESH_EXPIRY_TIME
export function generateAccessToken(user: IUser): string {
  return jwt.sign({ userId: user._id, userEmail: user.email, userName: user.name }, accessTokenSecret, { expiresIn: expiryTime });
}

export function generateRefreshToken(user: IUser): string {
  return jwt.sign({ userId: user._id }, refreshTokenSecret, { expiresIn: refreshExpiryTime });
}

export function verifyAccessToken(token: string): Promise<string | object> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as JwtPayload);
    });
  });
}

export function verifyRefreshToken(token: string): Promise<string | object> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, refreshTokenSecret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as JwtPayload);
    });
  });
}
