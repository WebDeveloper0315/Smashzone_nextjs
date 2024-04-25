import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
  email: { type: String, required: true },
  monthly: { type: Boolean },
  subscription: String,
  yearly: Boolean,
});
const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
