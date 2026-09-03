/**
 * Stripe helper (placeholder)
 * Full Stripe integration will be added later.
 */

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || "";

export async function createCheckoutSession(_params: {
  customerEmail: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  throw new Error("Stripe is not configured yet. Add Stripe keys to enable payments.");
}