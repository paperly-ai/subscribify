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
  role: string;
  content: string;
};
