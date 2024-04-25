import { LineItem, Stripe, loadStripe } from "@stripe/stripe-js";

export interface LineItems {
  price: string;
  quantity: number;
}

export async function checkout({
  lineItems,
  email,
  bookingDates,
}: {
  lineItems: LineItems[];
  email: string;
  bookingDates: string;
}) {
  let stripePromise: unknown = null;
  const getStripe = async () => {
    if (!stripePromise) {
      stripePromise = await loadStripe(process.env.NEXT_PUBLIC_API_KEY || "");
    }
    return stripePromise;
  };
  const stripe = (await getStripe()) as Stripe;
  const details = await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${
      window.location.origin
    }/api/success?email=${encodeURIComponent(
      email
    )}&bookings=${encodeURIComponent(
      bookingDates
    )}&session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/calendarapp/calendar?success=false`,
  });
  console.log(details);
}
