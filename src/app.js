import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

if (process.env.APP_ENV !== 'production') dotenv.config({ path: '.env.local' });

const app = express();

const APP_NAME = process.env.APP_NAME;
const PORT = 4000;
const MONGO_URI = process.env.MONGO_URI;


(async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`MongoDB Error: ${err}`);
    process.exit(1);
  }
})();

app.get("/", (req, res) => {
  res.send(`${APP_NAME} with MongoDB from Docker`);
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} running on http://localhost:${PORT}`);
});
