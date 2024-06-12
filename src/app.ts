/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';

import express, { Application,Router } from 'express';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();
const router = Router();
// parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);



app.use(globalErrorHandler);
app.use(notFound);
export default app;
