export interface Chats {
  id: number;
  pdfName: string;
  pdfUrl: string;
  createdAt: Date;
  userId: string;
  fileKey: string;
}

export type Message = {
  id: string;
  sender: string;
  content: string;
};

export interface Document {
  _id: string;
  pdfName: string;
  pdfUrl: string;
  pdfIndex: string;
  userId: string;
  __v: number;
}
