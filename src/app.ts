/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';

import express, { Application} from 'express';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());
app.use(cookieParser())
//application routes

app.use('/api', router);



app.use(globalErrorHandler);
app.use(notFound);
export default app;
