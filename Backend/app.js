import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectToDb from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDb();
app.use(cors());   // for now it accepts request from every domain

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/users', userRoutes);

export default app;