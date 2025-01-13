import express from 'express';
import * as conversationController from '../controllers/conversationController';
import { authMiddleWare } from '../middleware/authMiddleware';

const conversationRouter = express.Router();
conversationRouter.get('/:document_id', authMiddleWare, conversationController.getConversationsByDocumet);
export default conversationRouter;
