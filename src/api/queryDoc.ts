import axios from 'axios';
import { SERVER_URL } from './config';

export const queryDocument = async (documentId: string, query: string) => {
  try {
    const queryEndpoint = `${SERVER_URL}/api/waffle/query/invoke`;
    const token = localStorage.getItem('accessToken');

    const response = await axios.post(queryEndpoint, {
      pdfId: documentId,
      query: query
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data.message;
  } catch (error) {
    throw error;
  }
};


export const getConversationByPdfId = async (documentId: string) => {
  try {
    const queryEndpoint = `${SERVER_URL}/api/conversations/${documentId}`;
    const token = localStorage.getItem('accessToken');

    const response = await axios.get(queryEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }

}
