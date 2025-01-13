import axios from 'axios';
import { SERVER_URL } from './config';

export const queryDocument = async (documentId: string, query: string, callback: (content: string, error: string | null) => void): Promise<void> => {
  try {
    const queryEndpoint = `${SERVER_URL}/api/waffle/query/invoke`;
    const token = localStorage.getItem('accessToken');

    const response = await fetch(queryEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        pdfId: documentId,
        query: query
      })
    });

    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        throw new Error((await response.json()).error.message);
      }
      if (response.status >= 500) {
        throw new Error("Not able to reach server");
      }
      throw new Error("Failed to fetch data");
    }
    console.log(response);
    await handleStream(response, (content) => callback(content, null));
  } catch (error) {
    throw error;
  }
};


const handleStream = async (response: Response, callback: (content: string) => void): Promise<void> => {
  if (response.body) {
    const reader = response.body.getReader();

    while (true) {
      let { done, value } = await reader.read()
      if (done) {
        return;
      }
      const chunkString = new TextDecoder().decode(value);
      if (chunkString) {
        const message = chunkString.replace("data: ", "");
        callback(message);
      }
    }
  }
}



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


