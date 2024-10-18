import type { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";

export default async function orderUpdatedHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  try {
    const response = await fetch(
      "https://munchies.medusajs.app/email/shipping-confirmation/" +
        event.data.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export const config: SubscriberConfig = {
  event: ["order.updated"],
};
