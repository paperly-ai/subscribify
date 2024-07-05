import PDFViewer from "@/components/PdfViewer";
import ChatComponent from "@/components/chatComponent";
import ChatSideBar from "@/components/chatsidebar";
import { Chats } from "@/constants/constants";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const _chats: Chats[] = [
  {
    id: 1,
    pdfName: "Introduction to TypeScript",
    pdfUrl: "https://example.com/pdf/intro-to-typescript.pdf",
    createdAt: new Date("2024-06-01T10:00:00Z"),
    userId: "user123",
    fileKey: "file-key-001",
  },
  {
    id: 2,
    pdfName: "Advanced JavaScript",
    pdfUrl: "https://example.com/pdf/advanced-javascript.pdf",
    createdAt: new Date("2024-06-02T14:30:00Z"),
    userId: "user456",
    fileKey: "file-key-002",
  },
  {
    id: 3,
    pdfName: "Introduction to Node.js",
    pdfUrl: "https://example.com/pdf/intro-to-nodejs.pdf",
    createdAt: new Date("2024-06-03T09:15:00Z"),
    userId: "user789",
    fileKey: "file-key-003",
  },
  {
    id: 4,
    pdfName: "Building RESTful APIs with Express",
    pdfUrl: "https://example.com/pdf/restful-apis-express.pdf",
    createdAt: new Date("2024-06-04T11:45:00Z"),
    userId: "user321",
    fileKey: "file-key-004",
  },
  {
    id: 5,
    pdfName: "Getting Started with React",
    pdfUrl: "https://example.com/pdf/getting-started-react.pdf",
    createdAt: new Date("2024-06-05T13:20:00Z"),
    userId: "user654",
    fileKey: "file-key-005",
  },
  {
    id: 6,
    pdfName: "Introduction to Python Programming",
    pdfUrl: "https://example.com/pdf/intro-to-python.pdf",
    createdAt: new Date("2024-06-06T16:00:00Z"),
    userId: "user987",
    fileKey: "file-key-006",
  },
  {
    id: 7,
    pdfName: "Database Design Basics",
    pdfUrl: "https://example.com/pdf/database-design-basics.pdf",
    createdAt: new Date("2024-06-07T08:30:00Z"),
    userId: "user159",
    fileKey: "file-key-007",
  }
]

const ChatPage = () => {
  const pdf_url = "https://res.cloudinary.com/dhytswwcx/raw/upload/v1719912452/user_pdfs/undefined/xzb1yply70eb8u5s01nx";
  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={_chats} chatId={_chats[2].id} isPro={false} />
        </div>
        {/* pdf viewer */}
        <div className="max-h-screen p-4 oveflow-scroll flex-[3]">
          <PDFViewer pdf_url={pdf_url || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <ChatComponent chatId={_chats[2].id} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
