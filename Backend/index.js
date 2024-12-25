import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {createServer} from "http";
import { connectToDb } from './db/connection.js';
import { userRouter } from './routes/user.routes.js';
import { captainRouter } from './routes/captain.routes.js';
connectToDb();
const app = express();

const server = createServer(app);

const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

//routes

app.use('/api/v1/user',userRouter);
app.use('/api/v1/captain', captainRouter);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});