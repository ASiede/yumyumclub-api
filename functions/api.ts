import express from "express";
import serverless from "serverless-http";
import mongoose from "mongoose";
import cors from "cors";
import { router as spotsRouter } from "./routes/spots/index";

const app = express();

const router = express.Router();

app.use(cors());
app.use(express.json());

app.use("/", spotsRouter);
app.use("/", router);

// router.get("/", cors() as any, (req, res) => {
//   res.json({ hello: "yumyumclub!" });
// });

// app.listen(3000, () => {
//   console.log(`Server Started at ${3000}`);
// });

module.exports.handler = serverless(app);
