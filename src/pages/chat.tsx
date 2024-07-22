import PDFViewer from "@/components/PdfViewer";
import ChatComponent from "@/components/chatComponent";
import ChatSideBar from "@/components/chatsidebar";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Document } from "@/constants/constants";
import fetchDocuments from "@/api/document";


const ChatPage = () => {
  const { user, logout } = useAuth();
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocumentsData = async () => {
      try {
        setLoading(true);
        const data = await fetchDocuments();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentsData();
  }, []);


  const selectPDF = (id: string) => {
    setId(id);
  }

  const pdf_url = "https://res.cloudinary.com/dhytswwcx/raw/upload/v1719912452/user_pdfs/undefined/xzb1yply70eb8u5s01nx";
  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">

        {/* chat sidebar */}
        <div className="md:w-80">
          <ChatSideBar loading={loading} documents={documents} setId={selectPDF} chatId={id} isPro={false} user={user} logout={logout} />
        </div>
        {/* pdf viewer */}
        <div className="max-h-screen hidden lg:block p-4 oveflow-scroll flex-[3]">
          <PDFViewer pdf_url={pdf_url || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          {/* <DefaultChatScreen /> */}
          <ChatComponent chatId={id} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
