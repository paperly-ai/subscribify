// src/controllers/pdfController.ts
import { Request, Response } from 'express';
import PDF from '../models/pdfModel';
import * as pdfService from '../services/pdfService';

export const getAllPDFs = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = res.locals.user;
    const pdfs = await pdfService.getAllPDFs(user.userId);
    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getDocById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = res.locals.user;
    const document_id = req.params.id as string;
    const pdfs = await pdfService.getDocById(document_id);
    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).send(error);
  }
};
