import { Request, Response } from "express";
import { Spot } from "../models/model";

class Controller {
  async getSpotsToVisit(req: Request, res: Response) {
    const { visited } = req.query;
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

  async postSpot(req: any, res: any) {
    // TODO: error handling for duplicate name
    //   res.status(400).send({
    //     message: 'This is an error!'
    //  });
    // TODO: simplify required fields
    try {
      const requiredFields = ["name"];
      for (let i = 0; i < requiredFields.length; i += 1) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
          const message = `Missing \`${field}\` in request body`;
          return res.status(400).send(message);
        }
      }
      const data = await Spot.create({
        name: req.body.name,
        dateVisited: null,
      });
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  }
}
export const SpotsController = new Controller();
