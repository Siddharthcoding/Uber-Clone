import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectToDb from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
// const userRoutes = require("./routes/user.routes");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDb();
app.use(cors());   // for now it accepts request from every domain

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/users', userRoutes);

export default app;