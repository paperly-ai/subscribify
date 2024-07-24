import { queryDocumentFromPDFStore } from "../client/waffleClient";
import { QueryDocumentPayload } from "../constants/PdfConstants";
import { IMessage } from "../models/conversations";
import { updateConversation } from "./conversationService";

export const queryWaffle = async (userId: string, pdfId: string, query: string) => {
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

    const result = await queryDocumentFromPDFStore(payload);

    const assistantMessage: IMessage = {
      sender: "assistant",
      content: result,
      timestamp: new Date()
    }

    await updateConversation(pdfId, assistantMessage);
    return result;
  } catch (error: any) {
    throw Error(error.message);
  }
}
