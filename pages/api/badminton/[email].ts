import { TABLES } from "db/config";
import db from "db/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.query;
    const bookings = await db
      .selectFrom(TABLES.BOOKINGS)
      .where("email", "=", email)
      .selectAll()
      .execute();
    return res.status(200).json({ bookings, message: "Successful" });
  } catch (error) {
    console.log(error, "sdfscdscs");
  }
}
