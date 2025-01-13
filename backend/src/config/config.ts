import dotenv from 'dotenv';

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

export default config;
