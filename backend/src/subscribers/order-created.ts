import { Modules } from "@medusajs/framework/utils";
import type { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
import OrderConfirmation from "data/templates/order-confirmation";
import { sendEmail } from "./lib/email";

export default async function orderCreateHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
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
      react: OrderConfirmation(),
    });
}

export const config: SubscriberConfig = {
  event: ["order.placed"],
};
