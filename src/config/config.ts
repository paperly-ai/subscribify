import * as dotenv from 'dotenv';
dotenv.config();

interface Config {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  LOG_LEVEL: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

// Cloudinary configuration
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || 'your_cloud_name',
  api_key: process.env.CLOUD_API_KEY || 'your_api_key',
  api_secret: process.env.CLOUD_API_SECRET || 'your_api_secret',
});

export { cloudinary, config };
