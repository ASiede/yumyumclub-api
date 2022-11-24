// const { Submission } = require('../../models');
// const { validate } = require('../../utils/validation');
import express from "express";

class Controller {
  async getSpot(req: any, res: any) {
    try {
      res.status(200).json({ hello: "yum" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  // async postSubmission(req, res) {
  //   const requiredFields = ["bettor", "betEvent", "bets"];
  //   const { bettor, betEvent, bets } = req.body;

  //   try {
  //     const { valid, message } = validate(requiredFields, req.body);
  //     if (!valid) return res.status(400).send(message);

  //     const bet = await Submission.create({
  //       bettor: bettor,
  //       betEvent: betEvent,
  //       bets: bets,
  //     });
  //     res.status(201).json(bet);
  //   } catch (err) {
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // }
}
export const SpotsController = new Controller();
