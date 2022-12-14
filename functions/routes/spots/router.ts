import express from "express";
import bodyParser from "body-parser";
import { SpotsController } from "../../controllers/Spots.controller";

const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/", jsonParser, SpotsController.getSpotsToVisit);
router.post("/", jsonParser, SpotsController.postSpot);
router.put("/", jsonParser, SpotsController.putSpot);
router.delete("/", jsonParser, SpotsController.deleteSpot);

export { router };
