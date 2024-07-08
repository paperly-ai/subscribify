import User, { IUser } from '../models/user';
import bcrypt from 'bcrypt';

export async function createUser(userData: IUser): Promise<IUser> {
  try {
    const newUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    throw error;
  }
}

export async function getUsers(): Promise<IUser[]> {
  try {
    return await User.find().exec();
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: string): Promise<IUser | null> {
  try {
    return await User.findById(id).exec();
  } catch (error) {
    throw error;
  }
}


export async function deleteUser(id: string): Promise<void> {
  try {
    await User.findByIdAndDelete(id).exec();
  } catch (error) {
    throw error;
  }
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw error;
  }
}
