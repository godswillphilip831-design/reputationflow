/**
 * Stripe helper for ReputationFlow
 *
 * Install: npm install stripe @stripe/stripe-js
 *
 * Required env vars:
 * - STRIPE_SECRET_KEY
 * - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
 * - STRIPE_PRICE_ID          (the $79/mo price ID from Stripe Dashboard)
 * - STRIPE_WEBHOOK_SECRET
 */

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia", // update to latest when integrating
  typescript: true,
});

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || "";

/** Create a Checkout Session for the Professional plan */
export async function createCheckoutSession({
  customerEmail,
  userId,
  successUrl,
  cancelUrl,
}: {
  customerEmail: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: customerEmail,
    line_items: [
      {
        price: STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
    },
    subscription_data: {
      metadata: {
        userId,
      },
    },
  });

  return session;
}