import { Request, Response } from 'express';
import cloudinary from '../config/cloudinaryConfig';
import fs from 'fs';
import * as pdfService from '../services/pdfService';
import { IpdfFormat } from '../constants/PdfConstants';

export const uploadPDF = async (req: Request, res: Response) => {
  const filePath = req.file?.path;
  const user = res.locals.user;

  if (!user) {
    return res.status(401).json({ message: 'No user found' });
  }
  if (!filePath) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw',
      folder: `user_pdfs/${user.userId}`,
    });
    fs.unlinkSync(filePath);

    const pdfData: IpdfFormat = {
      pdfName: filePath.replace('uploads/', ''),
      pdfUrl: result.secure_url,
      pdfIndex: "123",
      userId: user.userId as string
    };
    const pdf = pdfService.createPDF(pdfData);

    res.json({ pdf });
  } catch (error) {
    res.status(500).json({ message: 'Upload Error', error });
  }
};

