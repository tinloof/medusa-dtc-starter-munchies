import type { OrderDTO } from "@medusajs/framework/types";
import { Heading, Img, Section } from "@react-email/components";
import EmailBody from "../components/email-body";
import Layout from "../components/layout";
import { title } from "../components/style";
import { mockOrder } from "../mock-data";

interface ShippingConfirmationEmailProps {
  order: OrderDTO;
}

function ShippingConfirmation({ order }: ShippingConfirmationEmailProps) {
  return (
    <Layout preview="Shipping confirmation">
      <Section align="left" className="mb-16 w-full max-w-[565px] px-5">
        <Img
          className="max-w-[291px]"
          src="https://cdn.sanity.io/images/1wtf7iqx/production/e04b80a29759293982d74afcde82a169505a3aaa-1166x112.png"
        />
        <Heading className="mt-16 mb-3" style={title}>
          Your order is on its way!
        </Heading>
        <EmailBody
          paragraphs={[
            `Great news! Your order #${order.display_id} has been shipped and is on its way to you.`,
            "If you have any questions about your delivery, please don't hesitate to contact us at munchies@medusajs.dev. We're always happy to assist!",
            "We hope you're as excited as we are for your purchase to arrive. Thank you for shopping with Munchies!",
          ]}
          signature
        />
      </Section>
    </Layout>
  );
}

export default function getShippingConfirmationTemplate(
  props?: ShippingConfirmationEmailProps
) {
  return <ShippingConfirmation order={props?.order ?? mockOrder} />;
}
