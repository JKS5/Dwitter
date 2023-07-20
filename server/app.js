import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import tweetsRoute from './router/tweets.js';

const app = express();
const corsOption = cors({
  origin: ['*'],
  optionsSuccessStatus: 200,
  credentials: true,
  maxAge: 3000,
});
// t
app.use(cors());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
//트윗에 대한 미들웨이 처리
app.use('/tweets', tweetsRoute);

// app.use((req, res, next) => {
//   res.sendStatus(404);
// });

// app.use((error, req, res, next) => {
//   console.error(error);
//   res.sendStatus(500);
// });

app.listen(8080);
