import HomePage from "@/pages/home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/Login";
import Dropzone from "./pages/uploadPdf";
import { handleFileUpload } from "./api/fileUpload";
import { Toaster } from "react-hot-toast";
import ChatPage from "./pages/chat";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        {/* <Route path="/upload-pdf" element={<Dropzone onFileUpload={handleFileUpload} />} /> */}
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
