import PDFViewer from './PdfViewer'
import ChatComponent from './chatComponent'
import { useNavigate, useParams } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { selectDocumentById } from '@/features/documents/documentSlice';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const ChatScreen = () => {
  const { document_id } = useParams();
  const navigation = useNavigate();
  if (document_id) {
    const selectedDocument = useSelector((state: RootState) => selectDocumentById(document_id)(state));
    if (selectedDocument) {
      return (
        <>
          <Tabs defaultValue="pdf-viewer" className='w-full h-screen relative lg:hidden'>
            <div className='mt-2 flex w-full items-center justify-center'>
              <TabsList className="w-80 sm:w-full mx-10 md:w-full grid  grid-cols-2">
                <TabsTrigger value="pdf-viewer">pdf-viewer</TabsTrigger>
                <TabsTrigger value="chat-screen">chat-screen</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="pdf-viewer">
              < div className="h-full p-4 oveflow-scroll flex-[3]" >
                <PDFViewer pdf_url={selectedDocument?.pdfUrl} />
              </div >
            </TabsContent>
            <TabsContent value="chat-screen">
              < div className="flex-[3] border-l-4 border-l-slate-200" >
                <ChatComponent document_id={document_id} />
              </div >
            </TabsContent>
          </Tabs>
          <div className='w-full lg:flex hidden'>
            <>
              < div className="max-h-screen hidden lg:block p-4 oveflow-scroll flex-[3]" >
                <PDFViewer pdf_url={selectedDocument?.pdfUrl} />
              </div >
              < div className="flex-[3] h-full border-l-4 border-l-slate-200" >
                <ChatComponent document_id={document_id} />
              </div >
            </>
          </div>

        </>

      )
    }
    else {
      navigation("/chat");
    }
  }
  else {
    navigation("/chat");
  }
}

export default ChatScreen


