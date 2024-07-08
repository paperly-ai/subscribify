import express from 'express';
import * as userController from '../controllers/userController';
import { authMiddleWare } from '../middleware/authMiddleware';

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.delete('/', authMiddleWare, userController.deleteUser);

export default userRouter;
