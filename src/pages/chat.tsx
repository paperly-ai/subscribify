import ChatSideBar from "@/components/chatsidebar";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Document } from "@/constants/constants";
import fetchDocuments from "@/api/document";
import { Outlet, useParams } from "react-router-dom";


const ChatPage = () => {
  const { document_id } = useParams();
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


  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">

        {/* chat sidebar */}
        <div className="md:w-80 max-h-screen">
          <ChatSideBar loading={loading} documents={documents} setId={selectPDF} chatId={document_id ? document_id : ''} isPro={false} user={user} logout={logout} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ChatPage;
