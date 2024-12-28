import { Heading, Img, Section } from "@react-email/components";
import EmailBody from "./components/email-body";
import Layout from "./components/layout";
import { title } from "./components/style";

type ShippingInfo = {
  display_id : number,
  customer_suffort_email : string,
  customer_suffort_phone : string
}

export default function ShippingConfirmation({display_id,customer_suffort_email,customer_suffort_phone} : ShippingInfo) {
  return (
    <Layout preview="Shipping confirmation">
      <Section className="w-full max-w-[565px] mb-16 px-5" align="left">
        <Img
          className="max-w-[291px]"
          src="https://muattar-store.vercel.app/images/Logo.png"
        />
        <Heading className="mb-3 mt-16" style={title}>
          Your order is on its way!
        </Heading>
        <EmailBody
          paragraphs={[
            `Great news! Your order (#${display_id}) has been shipped and is on its way to you.`,
            `If you have any questions about your delivery, please don't hesitate to contact us at ${customer_suffort_email} or ${customer_suffort_phone}. We're always happy to assist!`,
            "We hope you're as excited as we are for your purchase to arrive. Thank you for shopping with Muattar Store!",
          ]}
          signature
        />
      </Section>
    </Layout>
  );
}
