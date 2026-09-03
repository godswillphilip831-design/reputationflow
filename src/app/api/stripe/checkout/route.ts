import { NextRequest, NextResponse } from "next/server";
// import { stripe } from "@/lib/stripe";
// import { supabase } from "@/lib/supabase";

/**
 * POST /api/stripe/webhook
 *
 * Handles Stripe events (subscription created, updated, canceled).
 * In production: verify signature with STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: NextRequest) {
  // const body = await req.text();
  // const sig = req.headers.get("stripe-signature") || "";

  // let event;
  // try {
  //   event = stripe.webhooks.constructEvent(
  //     body,
  //     sig,
  //     process.env.STRIPE_WEBHOOK_SECRET || ""
  //   );
  // } catch (err) {
  //   return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  // }

  // switch (event.type) {
  //   case "checkout.session.completed":
  //     // Mark user as subscribed in your database
  //     break;
  //   case "customer.subscription.updated":
  //   case "customer.subscription.deleted":
  //     // Update subscription status
  //     break;
  // }

  return NextResponse.json({ received: true });
}