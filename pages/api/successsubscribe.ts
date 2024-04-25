import connectMongoDb from "libs/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";
import Subscription from "models/Subscription";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  res.redirect(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/calendarapp/calendar?success=true`
  );
  // await connectMongoDb();
  // const transporter = createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.GMAIL_USERNAME,
  //     pass: process.env.GMAIL_PASSWORD,
  //   },
  // });
  // const monthly = req.query.price === "price_1OhO6PCUEvfGIxZxNe6ggAIS";
  // const yearly = req.query.price === "price_1OhO6PCUEvfGIxZxCl08jj2c";
  // const alreadySubscribed = await Subscription.findOne({
  //   email: req.query.email,
  // });
  // if (alreadySubscribed) {
  //   await Subscription.findOneAndUpdate(
  //     { email: req.query.email },
  //     { monthly, yearly }
  //   );
  // } else {
  //   await Subscription.create({ monthly, yearly, email: req.query.email });
  // }

  // var mailOptions = {
  //   from: "ranjanlamichhanekiaan@gmail.com",
  //   to: decodeURIComponent(req.query.email as string),
  //   subject: "Confirmed subscription",
  //   html: `<h1>${
  //     monthly ? "Monthly " : "Yearly "
  //   }Subscription confirmation for ${
  //     monthly ? "10$ monthly charge" : "100$ yearly charge"
  //   }</h1>`,
  // };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //     res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`);
  //   } else {
  //   }
  // });
}
