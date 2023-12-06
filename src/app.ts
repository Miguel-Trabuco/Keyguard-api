import express from "express";
import 'dotenv/config';
import { connectDB } from "./database/connectDB";

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
connectDB();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
