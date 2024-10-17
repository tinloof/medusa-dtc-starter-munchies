import type { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
import { sendEmail } from "./lib/email";

export default async function productCreateHandler({
  event,
}: SubscriberArgs<{ email: string }>) {
  await sendEmail({
    to: event.data.email,
    subject: "Thank you for you order",
    html: "Thank you for your order",
  });
}

export const config: SubscriberConfig = {
  event: ["order.placed"],
};
