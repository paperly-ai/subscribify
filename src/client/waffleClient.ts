import axios from 'axios';
import { UpsertDocumentPayload, QueryDocumentPayload } from '../constants/PdfConstants';
import { error } from 'console';

const WAFFLE_SERVER_URI = process.env.WAFFLE_AI_URI

export async function upsertDocumentInPDFStore(payload: UpsertDocumentPayload) {
  const url = `${WAFFLE_SERVER_URI}/process_pdf/upsert_pdf`;
  try {
    const response = await axios.post(url, payload);
    if (response.status == 201) {
      return true;
    }
    else {
      throw error("Client Exception");
    }
  } catch (error) {
    console.error('Error upserting document:', error);
    throw error;
  }
}


export async function queryDocumentFromPDFStore(payload: QueryDocumentPayload) {
  const url = `${WAFFLE_SERVER_URI}/gemini/query/invoke`;
  try {
    const response = await axios.post(url, payload);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error querying document:', error);
    throw error;
  }
}
