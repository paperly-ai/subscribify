import { Request, Response } from 'express';
import * as queryService from '../services/queryService';

export const queryPDF = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = res.locals.user;
    const { pdfId, query }: { pdfId: string, query: string } = req.body;
    await queryService.queryWaffle(user.userId, pdfId, query);
    res.status(200).json();
  } catch (error) {
    res.status(500).send(error);
  }
};
