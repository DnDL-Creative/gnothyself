import { NextResponse } from "next/server";

/**
 * Shopify Webhook Handler
 * Receives order/inventory webhooks from Shopify.
 * Configure webhook URLs in Shopify Admin > Settings > Notifications.
 */
export async function POST(request: Request) {
  try {
    const body = await request.text();
    const hmac = request.headers.get("x-shopify-hmac-sha256");

    // TODO: Verify HMAC signature for security
    // TODO: Process webhook payload (order created, inventory updated, etc.)

    console.log("[Shopify Webhook] Received:", {
      topic: request.headers.get("x-shopify-topic"),
      hmac: hmac ? "present" : "missing",
      bodyLength: body.length,
    });

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[Shopify Webhook] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
