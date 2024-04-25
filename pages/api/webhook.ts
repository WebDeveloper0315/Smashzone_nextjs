import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";
import db from "db/postgres";
import { TABLES } from "db/config";

// const endpointSecret =
//   "whsec_02c20f49487711c47bdd366bb32dc98a31b0461b5838df2732c4e99b7ce101a7";
const endpointSecret = "whsec_6AvH6CpCQXI8TaaQPB0sbEcTxSuwXpnZ";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");
  // const payload = req.body;
  // console.log(payload, "loadd");
  const body = await buffer(req);
  const sig = req.headers["stripe-signature"] as string | string[];
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    const customErr = err as { message: string };
    return res.status(400).send(`Webhook Error: ${customErr.message}`);
  }
  console.log(event);
  if (
    event.type === "checkout.session.completed" &&
    event?.data?.object?.success_url
  ) {
    console.log(event.data.object);
    const [dirtyEmail, dirtyPrice] =
      event.data.object.success_url.split("?").at(1)?.split("&") ?? [];
    const email = decodeURIComponent(dirtyEmail.split("=").at(1) as string);
    const price = dirtyPrice.split("=").at(1);
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    const monthly = price === "price_1OhO6PCUEvfGIxZxNe6ggAIS";
    const yearly = price === "price_1OhO6PCUEvfGIxZxCl08jj2c";
    const alreadySubscribed = await db
      .selectFrom(TABLES.SUBSCRIPTIONS)
      .where("email", "=", email)
      .execute();
    if (alreadySubscribed) {
      (alreadySubscribed.monthly || alreadySubscribed.yearly) &&
        (await stripe.subscriptions.cancel(alreadySubscribed.subscription));
      await db
        .updateTable(TABLES.SUBSCRIPTIONS)
        .set({ monthly, yearly, subscription: event.data.object.subscription })
        .where("email", "=", email)
        .execute();
    } else {
      await db
        .insertInto(TABLES.SUBSCRIPTIONS)
        .values({
          monthly,
          yearly,
          email,
          subscription: event.data.object.subscription,
        })
        .execute();
    }

    const mailOptions = {
      from: "ranjanlamichhanekiaan@gmail.com",
      to: decodeURIComponent(email as string),
      subject: "Confirmed subscription",
      html: `<h1>${
        monthly ? "Monthly " : "Yearly "
      }Subscription confirmation for ${
        monthly ? "10$ monthly charge" : "100$ yearly charge"
      }</h1>`,
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
    });
  }
  res.status(201).json({ received: true });
}
export const config = {
  api: {
    bodyParser: false,
  },
};

const buffer = (req: NextApiRequest) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
};
