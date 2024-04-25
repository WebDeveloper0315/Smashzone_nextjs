import { TABLES } from "db/config";
import db from "db/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;
  const subscription = await db
    .selectFrom(TABLES.SUBSCRIPTIONS)
    .where("email", "=", email)
    .executeTakeFirst();
  return res
    .status(200)
    .json({ monthly: subscription?.monthly, yearly: subscription?.yearly });
}
