import PDF, { IPDF } from '../models/pdfModel';
import { IpdfFormat, UpsertDocumentPayload } from '../constants/PdfConstants';
import { upsertDocumentInPDFStore } from '../client/waffleClient';

export const getAllPDFs = async (userId: string): Promise<IPDF[]> => {
  try {
    const pdfs = await PDF.find({ userId });
    return pdfs;
  } catch (error: any) {
    throw new Error(`Error while fetching PDFs: ${error.message}`);
  }
};

export const getDocById = async (documentId: string): Promise<IPDF | null> => {
  try {
    const pdf = await PDF.findById(documentId);

    if (!pdf) {
      throw new Error(`PDF document with ID ${documentId} not found`);
    }

    return pdf;
  } catch (error: any) {
    throw new Error(`Error while fetching PDF document: ${error.message}`);
  }
};

export const createPDF = async (pdfData: IpdfFormat): Promise<IPDF> => {
  try {
    const newPDF = new PDF(pdfData);
    await newPDF.save();

    const payload: UpsertDocumentPayload = {
      user_id: pdfData.userId,
      document_id: String(newPDF._id),
      document_url: newPDF.pdfUrl
    };

    await upsertDocumentInPDFStore(payload);
    console.log("upserted successfully");
    return newPDF;
  } catch (error: any) {
    throw new Error(`Error while creating PDF: ${error.message}`);
  }
};

export const deleteDoc = async (documentId: string) => {
  try {
    const pdf = await PDF.findById(documentId);
    if (!pdf) {
      throw new Error('PDF document not found');
    }
    await pdf.deleteOne();
    return {
      success: true,
      message: 'PDF document deleted successfully',
    };
  } catch (error: any) {
    throw new Error(`Error while deleting PDF document: ${error.message}`);
  }
};
