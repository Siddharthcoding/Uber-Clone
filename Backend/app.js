import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());   // for now it accepts request from every domain

app.get('/', (req, res) => {
    res.send("Hello World");
});

export default app;