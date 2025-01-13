import express from 'express';
import { deleteDoc, getAllPDFs, getDocById } from '../controllers/pdfController';
import { authMiddleWare } from '../middleware/authMiddleware';

const pdfRouter = express.Router();
pdfRouter.get('/all', authMiddleWare, getAllPDFs);
pdfRouter.get('/:id', authMiddleWare, getDocById);
pdfRouter.delete('/:id', authMiddleWare, deleteDoc);

export default pdfRouter;
