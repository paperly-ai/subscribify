import express from 'express';
import { getAllPDFs, getDocById } from '../controllers/pdfController';
import { authMiddleWare } from '../middleware/authMiddleware';

const pdfRouter = express.Router();
pdfRouter.get('/all', authMiddleWare, getAllPDFs);
pdfRouter.get('/:id', authMiddleWare, getDocById);

export default pdfRouter;
