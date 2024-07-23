import axios from "axios";
import { SERVER_URL } from "./config";
import toast from "react-hot-toast";

export const documentUpload = async (file: File) => {
  console.log('Selected file:', file);

  const formData = new FormData();
  formData.append('pdf', file);

  const token = localStorage.getItem('accessToken');

  try {
    await axios.post(`${SERVER_URL}/api/pdf/upload`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    toast.success("Document uploaded successfully");

    return true;
  } catch (error: any) {
    toast.error("Error uploading document");

    throw error;
  }
};
