import { BigNumberValue, OrderDTO } from "@medusajs/framework/types";
import { Heading, Section } from "@react-email/components";
import Cart from "./components/cart";
import EmailBody from "./components/email-body";
import Layout from "./components/layout";
import CustomerInformation from "./components/shipping-address";
import { title } from "./components/style";
import { convertToLocale } from "./utils";

export default function OrderConfirmation({ order }: { order: OrderDTO }) {
  const convertMoney = (amount: BigNumberValue) => {
    return convertToLocale({
      // @ts-ignore
      amount,
      currency_code: order.currency_code,
    });
  };

  return (
    <Layout preview="Confirmation de commande">
      <Section className="w-full px-5 mt-5 mb-12" align="left">
        {/* <Img
          className="max-w-[291px] mb-20"
          src="https://cdn.sanity.io/images/1wtf7iqx/production/e04b80a29759293982d74afcde82a169505a3aaa-1166x112.png"
        /> */}
        <Heading className="pb-3" style={title}>
          Merci pour votre commande !
        </Heading>
        <EmailBody
          paragraphs={[
            "Merci beaucoup pour votre récente commande chez nous ! Nous sommes ravis de vous informer que nous avons bien reçu votre commande et qu'elle est en cours de traitement.",
            // "Thank you so much for your recent order with us! We're excited to let you know that we've received your order and it's now being processed.",
          ]}
        />
        <Cart
          currency_code={order.currency_code}
          items={order.items}
          date={new Date(order.created_at).toLocaleDateString("fr-CA", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          details={{
            subtotal: convertMoney(order.item_subtotal),
            discount: convertMoney(order.discount_total),
            shipping: convertMoney(order.shipping_total),
            taxes: convertMoney(order.tax_total),
            total: convertMoney(order.total),
          }}
        />
        <CustomerInformation
          method={order.shipping_methods?.[0]?.name}
          shippingAddress={order.shipping_address}
          billingAddress={order.billing_address}
        />
      </Section>
    </Layout>
  );
}
