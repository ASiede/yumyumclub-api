import { Request, Response } from "express";
import { Spot } from "../models/model";

class Controller {
  async getSpotsToVisit(req: Request, res: Response) {
    const visited = req.query.visited === "true";
    try {
      if (visited) {
        const spotsVisited = await Spot.find({ dateVisited: { $ne: null } });
        res.status(200).json(spotsVisited);
      } else {
        const spotsToVisit = await Spot.find({
          dateVisited: null,
        });
        res.status(200).json(spotsToVisit);
      }
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }

  async postSpot(req: Request, res: Response) {
    try {
      if (!req.body.name) {
        return res
          .status(400)
          .send({ message: "Missing name in request body" });
      }
      const spot = await Spot.create({
        name: req.body.name,
        dateVisited: null,
      });
      res.status(201).json(spot);
    } catch (err: any) {
      console.log(err);
      if (err.code === 11000) {
        res.status(400).send({
          message: `${err.keyValue?.name} already exists. Name must be unique`,
        });
      }
      res.status(500).send({ message: err });
    }
  }
}
export const SpotsController = new Controller();
