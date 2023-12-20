import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/connectDB";

import { userRouter } from "./routes/userRoutes";
import { keyRouter } from "./routes/keyRoutes";

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
connectDB();

const corsOptions = {
    origin: '*',
    credentials: true
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/user', userRouter);
app.use('/key', keyRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
