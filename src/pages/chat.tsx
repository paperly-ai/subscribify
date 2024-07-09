import PDFViewer from "@/components/PdfViewer";
import ChatComponent from "@/components/chatComponent";
import ChatSideBar from "@/components/chatsidebar";
import { Chats } from "@/constants/constants";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import DefaultChatScreen from "@/components/defaultChatScreen";

type Props = {
  params: {
    chatId: string;
  };
};

const _chats: Chats[] = [
  // {
  //   id: 1,
  //   pdfName: "Introduction to TypeScript",
  //   pdfUrl: "https://example.com/pdf/intro-to-typescript.pdf",
  //   createdAt: new Date("2024-06-01T10:00:00Z"),
  //   userId: "user123",
  //   fileKey: "file-key-001",
  // },
  // {
  //   id: 2,
  //   pdfName: "Advanced JavaScript",
  //   pdfUrl: "https://example.com/pdf/advanced-javascript.pdf",
  //   createdAt: new Date("2024-06-02T14:30:00Z"),
  //   userId: "user456",
  //   fileKey: "file-key-002",
  // },
  // {
  //   id: 3,
  //   pdfName: "Introduction to Node.js",
  //   pdfUrl: "https://example.com/pdf/intro-to-nodejs.pdf",
  //   createdAt: new Date("2024-06-03T09:15:00Z"),
  //   userId: "user789",
  //   fileKey: "file-key-003",
  // },
  // {
  //   id: 4,
  //   pdfName: "Building RESTful APIs with Express",
  //   pdfUrl: "https://example.com/pdf/restful-apis-express.pdf",
  //   createdAt: new Date("2024-06-04T11:45:00Z"),
  //   userId: "user321",
  //   fileKey: "file-key-004",
  // }
  // , {
  //   id: 8,
  //   pdfName: "Database Design Basics",
  //   pdfUrl: "https://example.com/pdf/database-design-basics.pdf",
  //   createdAt: new Date("2024-06-07T08:30:00Z"),
  //   userId: "user159",
  //   fileKey: "file-key-007",
  // }
  // ,
  // {
  //   id: 9,
  //   pdfName: "Database Design Basics",
  //   pdfUrl: "https://example.com/pdf/database-design-basics.pdf",
  //   createdAt: new Date("2024-06-07T08:30:00Z"),
  //   userId: "user159",
  //   fileKey: "file-key-007",
  // }
]

const ChatPage = () => {
  const { user, logout } = useAuth();
  const [id, setId] = useState(2);

  const pdf_url = "https://res.cloudinary.com/dhytswwcx/raw/upload/v1719912452/user_pdfs/undefined/xzb1yply70eb8u5s01nx";
  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={_chats} chatId={id} isPro={false} user={user} logout={logout} />
        </div>
        {/* pdf viewer */}
        {/* <div className="max-h-screen p-4 oveflow-scroll flex-[3]">
          <PDFViewer pdf_url={pdf_url || ""} />
        </div> */}
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <DefaultChatScreen />
          {/* <ChatComponent chatId={id} /> */}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
