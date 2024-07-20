import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8090;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
