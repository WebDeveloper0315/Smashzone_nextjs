import Stripe from "stripe";

import { NextApiRequest, NextApiResponse } from "next";
import { LineItems } from "./checkout";

export async function subscribe({
  lineItems,
  email,
}: {
  lineItems: LineItems[];
  email: string;
}) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "subscription",
    success_url: `${
      process.env.NEXT_PUBLIC_FRONTEND_URL
    }/api/successsubscribe?email=${encodeURIComponent(email)}&price=${
      lineItems.at(0)?.price
    }`,
    cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/calendarapp/calendar?success=false`,
  });
  return session.url;
}
