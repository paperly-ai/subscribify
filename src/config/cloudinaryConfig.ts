import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || 'your_cloud_name',
  api_key: process.env.CLOUD_API_KEY || 'your_api_key',
  api_secret: process.env.CLOUD_API_SECRET || 'your_api_secret',
});

export default cloudinary;
