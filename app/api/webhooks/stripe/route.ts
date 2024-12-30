import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get("stripe-signature")!;

    // Verify the webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    // Handle checkout session completion
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get the price ID from the session
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      const priceId = lineItems.data[0].price?.id;

      // Determine the plan based on price ID
      let plan: "lite" | "pro" | "business" | "enterprise";
      switch (priceId) {
        case "price_1QVIiNCr7fYvZ7eq3SRX0YGS":
        case "price_1QVIiNCr7fYvZ7eqmJT5DnJc":
          plan = "lite";
          break;
        case "price_1QVIjDCr7fYvZ7eqYZ884nMA":
        case "price_1QVIjDCr7fYvZ7eqcw53Mtin":
          plan = "pro";
          break;
        case "price_1QVInWCr7fYvZ7eqZ3FSVlFE":
        case "price_1QVInWCr7fYvZ7eqZg6AMiIv":
          plan = "business";
          break;
        default:
          throw new Error("Invalid price ID");
      }

      const customerEmail = session.customer_email;
      if (!customerEmail) {
        throw new Error("No customer email found in session");
      }

      await db
        .update(users)
        .set({
          plan,
          stripeCustomerId: session.customer as string,
        })
        .where(eq(users.email, customerEmail));
    }

    // Handle subscription updates
    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      const priceId = subscription.items.data[0].price.id;

      // Determine the new plan based on price ID
      let plan: "lite" | "pro" | "business" | "enterprise";
      switch (priceId) {
        case "price_1QVIiNCr7fYvZ7eq3SRX0YGS":
        case "price_1QVIiNCr7fYvZ7eqmJT5DnJc":
          plan = "lite";
          break;
        case "price_1QVIjDCr7fYvZ7eqYZ884nMA":
        case "price_1QVIjDCr7fYvZ7eqcw53Mtin":
          plan = "pro";
          break;
        case "price_1QVInWCr7fYvZ7eqZ3FSVlFE":
        case "price_1QVInWCr7fYvZ7eqZg6AMiIv":
          plan = "business";
          break;
        default:
          throw new Error("Invalid price ID");
      }

      await db
        .update(users)
        .set({ plan })
        .where(eq(users.stripeCustomerId, subscription.customer as string));
    }

    // Handle subscription deletions
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;

      await db
        .update(users)
        .set({ plan: "free" })
        .where(eq(users.stripeCustomerId, subscription.customer as string));
    }

    // Handle failed payments
    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice;

      // You might want to notify the user or take other actions
      console.error(`Payment failed for customer ${invoice.customer}`);
    }

    // Handle customer deletion
    if (event.type === "customer.deleted") {
      const customer = event.data.object as Stripe.Customer;

      await db
        .update(users)
        .set({
          plan: "free",
          stripeCustomerId: null,
        })
        .where(eq(users.stripeCustomerId, customer.id));
    }

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
