import express from 'express';
import morgan from 'morgan';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { jsonApiResponseMiddleware } from './middlewares/json-response.middleware';
import { authRouter } from './routes/auth.routes';
import { projectRouter } from './routes/project.routes';
import helmet from 'helmet';
import cors from "cors";

const app = express();

app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jsonApiResponseMiddleware);

app.use("/auth", authRouter);
app.use("/projects", projectRouter);

app.use(errorHandlerMiddleware);

export default app;