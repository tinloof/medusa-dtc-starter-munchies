import { Heading, Img, Section } from "@react-email/components";
import EmailBody from "./components/email-body";
import Layout from "./components/layout";
import { title } from "./components/style";

export default function ShippingConfirmation() {
  return (
    <Layout preview="Shipping confirmation">
      <Section className="w-full max-w-[565px] mb-16 px-5" align="left">
        <Img
          className="max-w-[291px]"
          src="https://cdn.sanity.io/images/1wtf7iqx/production/e04b80a29759293982d74afcde82a169505a3aaa-1166x112.png"
        />
        <Heading className="mb-3 mt-16" style={title}>
          Your order is on its way!
        </Heading>
        <EmailBody
          paragraphs={[
            "Great news! Your order [Order Number] has been shipped and is on its way to you.",
            "If you have any questions about your delivery, please don't hesitate to contact us at [Customer Support Email] or [Customer Support Phone Number]. We're always happy to assist!",
            "We hope you're as excited as we are for your purchase to arrive. Thank you for shopping with Munchies!",
          ]}
          signature
        />
      </Section>
    </Layout>
  );
}
