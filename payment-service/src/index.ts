import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './main';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8090;
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express TypeScript!');
});

app.use('/api/stripe', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
