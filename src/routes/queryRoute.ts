import express from 'express';
import * as queryController from '../controllers/queryController';
import { authMiddleWare } from '../middleware/authMiddleware';

const queryRouter = express.Router();

queryRouter.post('/query/invoke', authMiddleWare, queryController.queryPDF);

export default queryRouter;
