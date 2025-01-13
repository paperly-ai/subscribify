import axios from "axios";
import { SERVER_URL } from "./config";

const DOCUMENT_URL = `${SERVER_URL}/api/pdf/all`;

const fetchDocuments = async () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    console.error('Access token not found');
    return;
  }
  try {
    const response = await axios.get(DOCUMENT_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}


export const deleteDocument = async (document_id: string) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    console.error('Access token not found');
    return;
  }
  try {
    const response = await axios.delete(`${SERVER_URL}/api/pdf/${document_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}

export default fetchDocuments;
