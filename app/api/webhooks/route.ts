import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/libs";
import {
  manageSubscriptionStatusChange,
  upsertPrice,
  upsertProduct
} from "@/libs/supabase/admin";

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted"
]);

export async function POST(request: Request) {
  let event: Stripe.Event;
  let body: string;
  const signature = headers().get("Stripe-Signature");
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET;

  try {
    body = await request.text();
    if (!body) throw new Error("Webhook Error: No body included");
    if (!signature || !webhookSecret)
      throw new Error("No signature and/or secret!");
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.log(`❌ Error message: ${err}`);
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    let subscription: Stripe.Subscription;
    let checkoutSession: Stripe.Checkout.Session;
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          await upsertProduct(event.data.object as Stripe.Product);
          break;
        case "price.created":
        case "price.updated":
          await upsertPrice(event.data.object as Stripe.Price);
          break;
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          subscription = event.data.object as Stripe.Subscription;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === "customer.subscription.created"
          );
          break;
        case "checkout.session.completed":
          checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId as string,
              checkoutSession.customer as string,
              true
            );
          }
          break;
        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log(error);
      return new NextResponse(
        'Webhook error: "Webhook handler failed. View logs."',
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
