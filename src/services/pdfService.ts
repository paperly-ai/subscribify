import PDF, { IPDF } from '../models/pdfModel';
import { IpdfFormat } from '../constants/PdfConstants';

export const getAllPDFs = async (userId: string): Promise<IPDF[]> => {
  try {
    const pdfs = await PDF.find({ userId });
    return pdfs;
  } catch (error: any) {
    throw new Error(`Error while fetching PDFs: ${error.message}`);
  }
};

export const createPDF = async (pdfData: IpdfFormat): Promise<IPDF> => {
  try {
    const newPDF = new PDF(pdfData);
    await newPDF.save();
    return newPDF;
  } catch (error: any) {
    throw new Error(`Error while creating PDF: ${error.message}`);
  }
};
