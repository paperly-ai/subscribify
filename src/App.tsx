import HomePage from "@/pages/home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/Login";
import Dropzone from "./pages/uploadPdf";
import { handleFileUpload } from "./api/fileUpload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/upload-pdf" element={<Dropzone onFileUpload={handleFileUpload} />} />
      </Routes>
    </Router>
  );
}

export default App;
