import express from 'express';
import multer from 'multer';
import { uploadPDF } from '../controllers/uploadController';

const uploadRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

uploadRouter.post('/upload', upload.single('pdf'), uploadPDF);

export default uploadRouter;
