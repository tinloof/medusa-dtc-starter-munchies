import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { sendOrderShipmentWorkflow } from "src/workflows/send-shipment-confirmation";

export default async function orderShippedHandler({ event: { data }, container }: SubscriberArgs<{ id: string }>) {
  await sendOrderShipmentWorkflow(container).run({
    input: {
      id: data.id,
    },
  });
}

export const config: SubscriberConfig = {
  event: "order.fulfillment_created",
};
