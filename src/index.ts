import express, { Request, Response } from 'express';
import config from './config/config';
import uploadRouter from './routes/uploadRoute';
import cors from 'cors';


const app = express();

app.use(cors());
const port = config.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api', uploadRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
