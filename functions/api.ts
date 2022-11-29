import * as dotenv from "dotenv";
import express from "express";
import serverless from "serverless-http";
import mongoose from "mongoose";
import cors from "cors";
import { router as spotsRouter } from "./routes/spots/index";

dotenv.config();
const isLocal = (process.env.NODE_ENV = "local");

// Connect to the Database
const mongoString = process.env.DATABASE_URL || "";
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
const router = express.Router();

// app.use(
//   cors({
//     origin: "https://www.section.io",
//   })
// );

app.use(cors());
app.use(express.json());

app.use("/", spotsRouter);
app.use("/", router);

// Start up local server
if (isLocal) {
  app.listen(3000, () => {
    console.log(`Local Server Started at ${3000}`);
  });
}

module.exports.handler = serverless(app);
