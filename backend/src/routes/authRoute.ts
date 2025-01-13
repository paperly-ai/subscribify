import express from 'express';
import * as authController from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/signup', authController.signup);
authRouter.post('/refresh', authController.refreshTokens);

export default authRouter;
