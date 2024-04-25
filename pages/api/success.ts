import { NextApiRequest, NextApiResponse } from "next";
import { BookingDate } from "pages/calendarapp/calendar";
import { createTransport } from "nodemailer";
import Stripe from "stripe";
import db from "db/postgres";
import { TABLES } from "db/config";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const bookingsDirty: BookingDate[] = JSON.parse(
    decodeURIComponent(req.query.bookings as string)
  );
  const session = await stripe.checkout.sessions.retrieve(
    req.query.session_id as string
  );
  const bookings = bookingsDirty.map((el) => ({
    start: el.startDate,
    end: el.endDate,
    email: decodeURIComponent(req.query.email as string),
    resourceId: el.court,
    paymentIntent: session.payment_intent,
    price: el.price,
  }));
  
  await db.insertInto(TABLES.BOOKINGS).values(bookings).execute();
  
  var transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  const bookingsEl = bookingsDirty.map(
    (el) =>
      `<h2>Booking from${new Date(el.startDate).toLocaleString()} to ${new Date(
        el.endDate
      ).toLocaleString()}</h2>`
  );
  var mailOptions = {
    from: "ranjanlamichhanekiaan@gmail.com",
    to: decodeURIComponent(req.query.email as string),
    subject: "Confirmed booking",
    html: `<h1>Booking confirmed</h1>${bookingsEl}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`);
    } else {
      console.log("Email sent: " + info.response);

      res.redirect(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/calendarapp/calendar?success=true`
      );
    }
  });
}
