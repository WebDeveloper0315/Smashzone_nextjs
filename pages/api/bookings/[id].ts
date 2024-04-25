import dayjs from "dayjs";
import { TABLES } from "db/config";
import db from "db/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "PATCH") {
      return res.status(405).end();
    }
    const { id } = req.query;
    const { startDate, duration, cancel } = req.body;
    if (cancel) {
      // Cancel the booking
      await db
        .updateTable(TABLES.BOOKINGS)
        .set({
          isCancelled: true,
        })
        .where("id", "=", id)
        .executeTakeFirst();
    } else {
      // Change the time
      const start = dayjs(startDate).toISOString();
      const end = dayjs(startDate).add(duration, "hour").toISOString();
      await db
        .updateTable(TABLES.BOOKINGS)
        .set({
          start,
          end,
        })
        .where("id", "=", id)
        .executeTakeFirst();
    }

    return res.status(200).json({ message: "Successful" });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
}
