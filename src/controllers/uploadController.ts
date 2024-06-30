import { Request, Response } from 'express';
import cloudinary from '../config/cloudinaryConfig';
import fs from 'fs';

export const uploadPDF = async (req: Request, res: Response) => {
  const filePath = req.file?.path;
  const userId = req.body.userId;


  if (!filePath) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw',
      folder: `user_pdfs/${userId}`,
    });
    fs.unlinkSync(filePath);

    res.json({ message: 'Upload Successful', url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Upload Error', error });
  }
};

