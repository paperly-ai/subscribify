import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  sender: string;
  content: string;
  timestamp: Date;
}

export interface IConversation extends Document {
  pdf_id: string;
  createdAt: Date;
  updatedAt: Date;
  messages: IMessage[];
}

const MessageSchema: Schema = new Schema({
  sender: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

const ConversationSchema: Schema = new Schema({
  pdf_id: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  messages: [MessageSchema]
});

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
