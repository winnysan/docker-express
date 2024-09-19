import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 4000;

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/database";

(async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`MongoDB Error: ${err}`);
    process.exit(1);
  }
})();

app.get("/", (req, res) => {
  res.send("Express app with MongoDB from Docker");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
