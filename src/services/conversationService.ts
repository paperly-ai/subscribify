import { Request, Response } from 'express';
import Conversation, { IConversation, IMessage } from '../models/conversations';


export const getConversationByPdfId = async (pdfId: string) => {
  try {

    const conversation: IConversation | null = await Conversation.findOne({ pdf_id: pdfId });
    if (!conversation) {
      throw Error("Conversation not found");
    }

    return conversation
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const createConversation = async (pdfId: string) => {
  try {
    const messages: IMessage[] = [];
    const newConversation: IConversation = new Conversation({ pdfId, messages });
    await newConversation.save();
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const updateConversation = async (pdfId: string, message: IMessage): Promise<void> => {
  try {
    await Conversation.findOneAndUpdate(
      { pdf_id: pdfId },
      {
        $push: { messages: message },
        $set: { updatedAt: new Date() }
      },
      { new: true }
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteConversation = async (req: Request, res: Response): Promise<void> => {
  try {
    const conversationId: string = req.params.id;
    await Conversation.findByIdAndDelete(conversationId);
    res.status(200).json({ message: 'Conversation deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
