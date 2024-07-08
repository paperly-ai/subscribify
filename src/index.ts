import express, { Request, Response } from 'express';
import config from './config/config';
import uploadRouter from './routes/uploadRoute';
import cors from 'cors';
import userRouter from './routes/userRoute';
import connectDB from './config/db';
import { authMiddleWare } from './middleware/authMiddleware';
import authRouter from './routes/authRoute';


const app = express();

app.use(cors());
const port = config.PORT || 3000;

app.use(express.json());
// app.use(authMiddleWare)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/pdf', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
