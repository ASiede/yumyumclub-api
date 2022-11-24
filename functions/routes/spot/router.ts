import express from "express";
import bodyParser from "body-parser";
import { SpotController } from "../../controllers/Spot.controller";

const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/", jsonParser, SpotController.getSpot);

export { router };
