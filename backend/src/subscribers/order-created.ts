import { Modules } from "@medusajs/framework/utils";
import type { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
import OrderConfirmation from "data/templates/order-confirmation";
import { sendEmail } from "./lib/email";

export default async function orderCreateHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  try {
    const response = await fetch(
      "https://webhook.site/0df8043b-24a3-413c-bec4-9b9af64c6049",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event.data),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Event data posted successfully");
  } catch (error) {
    console.error("Error posting event data:", error);
  }

  const orderService = container.resolve(Modules.ORDER);

  const order = await orderService
    .listOrders({
      id: event.data.id,
    })
    .then((orders) => orders[0]);

  if (order)
    await sendEmail({
      to: order.email,
      subject: "Thank you for you order",
      react: OrderConfirmation({ order }),
    });
}

export const config: SubscriberConfig = {
  event: ["order.placed"],
};
