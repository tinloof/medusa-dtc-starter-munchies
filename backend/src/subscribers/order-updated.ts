import { Modules } from "@medusajs/framework/utils";
import type { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
import ShippingConfirmation from "data/templates/shipping-confirmation";
import { sendEmail } from "./lib/email";

export default async function orderUpdatedHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const orderService = container.resolve(Modules.ORDER);

  const order = await orderService
    .listOrders({
      id: event.data.id,
    })
    .then((orders) => orders[0]);

  await sendEmail({
    to: order.email,
    subject: "Your order is shipped",
    react: ShippingConfirmation(),
  });
}

export const config: SubscriberConfig = {
  event: ["order.updated"],
};
