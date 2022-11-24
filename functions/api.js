const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();
const router = express.Router();
app.use(cors());

router.get("/", cors(), (req, res) => {
  res.json({ hello: "yumyumclub" });
});

app.use("/", router);
module.exports.handler = serverless(app);
