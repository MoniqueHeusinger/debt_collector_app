import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import { loanRouter, debtorRouter } from "./src/routes/index.js";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const app = express();

// Server setup
const PORT = process.env.PORT || 4000;
const serverListenToPort = () =>
  app.listen(PORT, () => console.log("Server listening on port: ", PORT));

app.use(morgan("dev"));
app.use(express.json());

// test endpoint
app.get("/", (req, res) => {
  res.send("Hi Justus!");
  console.log("Grüß dich, Justus!");
});

// 1.) loans endpoint
// =====================================
app.use("/api/v1/loans", loanRouter.default);

// 2.) debtor endpoint
// =====================================
app.use("/api/v1/debtors", debtorRouter.default);

// server and database connection setup
console.log("Connecting to database...");
mongoose
  .connect(MONGODB_URL, { dbName: "familybusiness" })
  .then(() => {
    console.log("Database connection successfull");
    serverListenToPort();
  })
  .catch((error) => {
    console.log("Error connecting to database!");
    console.log(error);
    console.log("Server will not start. Aborting...");
    process.exit();
  });
