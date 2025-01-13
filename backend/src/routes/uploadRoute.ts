import express from 'express';
import multer from 'multer';
import { uploadPDF } from '../controllers/uploadController';
import { authMiddleWare } from '../middleware/authMiddleware';

const uploadRouter = express.Router();

const upload = multer({ dest: 'uploads/' });
uploadRouter.post('/upload', upload.single('pdf'), authMiddleWare, uploadPDF);

export default uploadRouter;
