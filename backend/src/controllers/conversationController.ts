
import { Request, Response } from 'express';
import * as conversationService from '../services/conversationService';

export const getConversationsByDocumet = async (req: Request, res: Response): Promise<void> => {
  try {
    const pdfId = req.params.document_id as string;
    const conversation = await conversationService.getConversationByPdfId(pdfId);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
};
