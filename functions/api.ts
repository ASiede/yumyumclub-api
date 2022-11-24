import express from "express";
import serverless from "serverless-http";
import cors from "cors";
const app = express();
const router = express.Router();
app.use(cors());

import { router as spotRouter } from "./routes/spot";

app.use("/", spotRouter);

// router.get("/", cors() as any, (req, res) => {
//   res.json({ hello: "yumyumclub!" });
// });

app.use("/", router);
module.exports.handler = serverless(app);
