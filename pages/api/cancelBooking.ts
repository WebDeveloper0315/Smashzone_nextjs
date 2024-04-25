import connectMongoDb from "libs/mongodb";
import Badminton from "models/Badminton";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { paymentIntent, _id, amount } = req.body;
    console.log(paymentIntent, _id);
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntent,
      amount: amount * 100,
    });
    await connectMongoDb();
    await Badminton.findByIdAndDelete(_id);
    return res.status(200).json({ message: "Successful" });
  } catch (error) {
    console.log(error, "sdfscdscs");
    res.status(500).json({ message: "failed" });
  }
}
