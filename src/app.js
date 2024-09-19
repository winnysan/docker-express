import express from "express";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("From Docker");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});