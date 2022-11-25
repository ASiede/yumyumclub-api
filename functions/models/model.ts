import mongoose from "mongoose";

const spotSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  dateVisited: {
    required: false,
    type: Date,
  },
});
const Spot = mongoose.model("Spot", spotSchema);
export { Spot };
