import express from 'express';
import { getAllPDFs } from '../controllers/pdfController';
import { authMiddleWare } from '../middleware/authMiddleware';

const pdfRouter = express.Router();
pdfRouter.get('/all', authMiddleWare, getAllPDFs);

export default pdfRouter;
