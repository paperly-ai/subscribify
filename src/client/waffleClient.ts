import axios from 'axios';

interface upsertDocument {
  user_id: string,
  document_id: string,
  document_url: string
}

interface queryDocument {
  user_id: string,
  document_id: string,
  query: string

}

const WAFFLE_SERVER_URI = process.env.WAFFLE_AI_URI

export async function upsertDocumentInPDFStore(payload: upsertDocument) {
  const url = `${WAFFLE_SERVER_URI}/process_pdf/upsert_pdf`;
  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (error) {
    console.error('Error upserting document:', error);
    throw error;
  }
}


export async function queryDocumentFromPDFStore(payload: queryDocument) {
  const url = `${WAFFLE_SERVER_URI}/query_pdf/query`;
  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (error) {
    console.error('Error querying document:', error);
    throw error;
  }
}
