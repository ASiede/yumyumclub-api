import { Spot } from "../models/model";

class Controller {
  async getSpot(req: any, res: any) {
    try {
      const data = await Spot.find();
      res.json(data);
    } catch (err) {
      console.log("err", err);
      res.status(500).message(err);
    }
  }

  async postSpot(req: any, res: any) {
    // TODO: error handling for duplicate name
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
      });
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  }
}
export const SpotsController = new Controller();
