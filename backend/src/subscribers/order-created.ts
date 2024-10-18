import type { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";

export default async function orderCreateHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  try {
    const response = await fetch(
      "https://munchies.medusajs.app/email/order-confirmation/" + event.data.id,
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
  event: ["order.placed"],
};
