import express from 'express';
import * as userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
