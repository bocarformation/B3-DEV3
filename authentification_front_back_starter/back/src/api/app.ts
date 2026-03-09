import express from 'express';
import morgan from 'morgan';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { jsonApiResponseMiddleware } from './middlewares/json-response.middleware';

const app = express();

app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jsonApiResponseMiddleware);



app.use(errorHandlerMiddleware);

export default app;