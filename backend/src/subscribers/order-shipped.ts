import type { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";

export default async function orderShippedHandler({
  event,
  container,
}: SubscriberArgs<{ order_id: string }>) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL || "http://localhost:9000"}/store/email/shipping-confirmation/${
        event.data.order_id
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": process.env.MEDUSA_PUBLISHABLE_KEY,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export const config: SubscriberConfig = {
  event: ["order.fulfillment_created"],
};
