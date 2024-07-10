import axios from "axios";
import { SERVER_URL } from "./config";
import toast from "react-hot-toast";

export const documentUpload = async (file: File) => {
  console.log('Selected file:', file);

  const formData = new FormData();
  formData.append('pdf', file);

  const token = localStorage.getItem('accessToken');

  try {
    const response = await axios.post(`${SERVER_URL}/api/pdf/upload`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    toast.success("Document uploaded successfully");
    console.log('Upload response:', response.data);
    return true;
  } catch (error) {
    toast.error("Error uploading document");
    console.error('Upload error:', error);
    return false; // Optionally handle the error or rethrow it
  }
};
