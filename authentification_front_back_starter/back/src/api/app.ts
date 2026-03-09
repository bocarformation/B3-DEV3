import express from 'express';
import morgan from 'morgan';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { jsonApiResponseMiddleware } from './middlewares/json-response.middleware';
import { authRouter } from './routes/auth.routes';

const app = express();

app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jsonApiResponseMiddleware);

app.use("/auth", authRouter);

app.use(errorHandlerMiddleware);

export default app;