import { Readable } from "stream";
import { queryDocumentFromPDFStore, queryDocumentStream } from "../client/waffleClient";
import { QueryDocumentPayload } from "../constants/PdfConstants";
import { IMessage } from "../models/conversations";
import { updateConversation } from "./conversationService";


interface SSEResponse {
  data: string;
  save(): Promise<void>;
}

export const queryWaffle = async (userId: string, pdfId: string, query: string): Promise<Readable> => {
  try {
    const userMessage: IMessage = {
      sender: "user",
      content: query,
      timestamp: new Date()
    }

    await updateConversation(pdfId, userMessage);
    console.log("update user query");

    const payload: QueryDocumentPayload = {
      user_id: userId,
      document_id: pdfId,
      query: query
    }

    const resultStream =
      await queryDocumentStream(payload);
    const readableStream = new Readable({
      read() { },
    });


    const reader = resultStream.getReader();
    let message = "";
    const readStream = async () => {
      reader.read().then(async ({ value, done }) => {
        if (done) {
          console.log('Stream reading complete.');
          readableStream.push(null);
          const assistantMessage: IMessage = {
            sender: "assistant",
            content: message,
            timestamp: new Date()
          }
          console.log('Stream reading complete.');
          await updateConversation(pdfId, assistantMessage);
          return;
        }
        const chunk = new TextDecoder().decode(value);
        message += chunk.replace("data:", "");
        readableStream.push(chunk.replace("data:", ""));
        readStream();
      }).catch(error => {
        console.error('Error reading stream:', error);
      });
    };


    readStream();

    return readableStream;
  } catch (error: any) {
    throw Error(error.message);
  }
}
