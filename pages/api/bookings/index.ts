import dayjs from "dayjs";
import { TABLES } from "db/config";
import db from "db/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get bookings
    if (req.method === "GET") {
      const bookings = await db.selectFrom(TABLES.BOOKINGS).selectAll().execute();

      return res.status(200).json({ message: "successful", bookings });
    }

    // Create a manual booking
    if (req.method === "PUT") {
      const { startDate, hasPaid, court, duration, bookedBy } = req.body;

      await db
        .insertInto(TABLES.BOOKINGS)
        .values([
          {
            start: dayjs(startDate).second(0).millisecond(0).toISOString(),
            end: dayjs(startDate)
              .add(duration, "hour")
              .second(0)
              .millisecond(0)
              .toISOString(),
            resourceId: court,
            hasPaid,
            isCancelled: false,
            email: bookedBy,
          },
        ])
        .executeTakeFirst();

      return res.status(200).json({ message: "successful" });
    }

    return res.status(405).end();
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
