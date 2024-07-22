import HomePage from "@/pages/home";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from "./pages/Login";
import { Toaster } from "react-hot-toast";
import ChatPage from "./pages/chat";
import ChatScreen from "./components/ChatScreen";
import DefaultChatScreen from "./components/defaultChatScreen";
import { useAuth } from "./hooks/useAuth";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />}>
          <Route path="/chat/" element={< DefaultChatScreen />} />
          <Route path="/chat/:document_id" element={< ChatScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
