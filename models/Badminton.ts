import mongoose, { Schema } from "mongoose";

const badmintonSchema = new Schema({
  email: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  resourceId: String,
  paymentIntent: String,
  price: Number,
  isCancelled: Boolean,
  hasPaid: Boolean
});
const Badminton =
  mongoose.models.Badminton || mongoose.model("Badminton", badmintonSchema);
export default Badminton;
