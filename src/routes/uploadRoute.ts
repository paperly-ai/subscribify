import express from 'express';
import multer from 'multer';
import { uploadPDF } from '../controllers/uploadController';
import { authMiddleWare } from '../middleware/authMiddleware';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

uploadRouter.post('/upload', upload.single('pdf'), authMiddleWare, uploadPDF);

export default uploadRouter;
