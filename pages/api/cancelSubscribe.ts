import { TABLES } from "db/config";
import db from "db/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");
    const { email } = req.body;

    const alreadySub = await db
      .selectFrom(TABLES.SUBSCRIPTIONS)
      .where("email", "=", email)
      .executeTakeFirst();

    await db
      .updateTable(TABLES.SUBSCRIPTIONS)
      .set({
        monthly: false,
        yearly: false,
        subscription: "",
      })
      .where("email", "=", email)
      .execute();

    if (alreadySub?.subscription)
      await stripe.subscriptions.cancel(alreadySub?.subscription);
    res.status(200).json({ message: "ksndcks" });
  } catch (err) {
    res.status(500).json({ message: "ksndcks" });
    console.log(err);
  }
}
