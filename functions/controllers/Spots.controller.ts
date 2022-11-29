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

  async getSpot(req: Request, res: Response) {
    const { id } = req.query;
    try {
      const spot = await Spot.findById(id);
      res.status(200).json(spot);
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
      if (err.code === 11000) {
        res.status(400).send({
          message: `${err.keyValue?.name} already exists. Name must be unique`,
        });
      }
      res.status(500).send({ message: err });
    }
  }

  async putSpot(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const updateableFields = ["name", "dateVisited"];
      const toUpdate = updateableFields.reduce((acc: any, field) => {
        if (field in req.body) {
          acc[field] = req.body[field];
        }
        return acc;
      }, {});
      const updatedSpot = await Spot.findOneAndUpdate({ _id: id }, toUpdate, {
        new: true,
      });
      res.status(200).json(updatedSpot);
    } catch (err: any) {
      res.status(500).send({ message: err });
    }
  }

  async deleteSpot(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const updatedSpot = await Spot.findByIdAndRemove(id);
      res.status(200).json(updatedSpot);
    } catch (err: any) {
      res.status(500).send({ message: err });
    }
  }
}
export const SpotsController = new Controller();
