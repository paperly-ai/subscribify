import { Request, Response } from 'express';
import * as queryService from '../services/queryService';

export const queryPDF = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = res.locals.user;
    const { pdfId, query }: { pdfId: string, query: string } = req.body;

    const resultStream = await queryService.queryWaffle(user.userId, pdfId, query);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    resultStream.on("data", (chunk: Buffer) => {
      const dataStr = chunk.toString();
      res.write(`${dataStr}`);
    });

    resultStream.on("end", () => {
      res.end();
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
