import type { OrderLineItemDTO } from "@medusajs/framework/types";
import { Column, Hr, Img, Row, Section, Text } from "@react-email/components";
import { convertToLocale } from "../utils";
import { bodySmall, bodyXSmall } from "./style";

export default function Cart({
  details,
  items,
  currency_code,
}: {
  date?: string;
  items: OrderLineItemDTO[];
  currency_code: string;
  details?: {
    subtotal: string;
    discount: string;
    shipping: string;
    taxes: string;
    total: string;
  };
}) {
  return (
    <Section className="mb-10">
      <Section className="mb-4">
        <Text className="w-fit font-bold uppercase" style={bodySmall}>
          Order summary
        </Text>
      </Section>
      {items.map((item) => (
        <CartLine currency_code={currency_code} key={item.id} line={item} />
      ))}
      {details ? (
        <Section align="right" className="max-w-[365px]">
          <CheckoutLine price={details.subtotal} title="Subtotal" />
          <CheckoutLine price={details.discount} title="Order discount" />
          <CheckoutLine price={details.shipping} title="Shipping" />
          <CheckoutLine price={details.taxes} title="Taxes" />
          <Hr className="mb-4 h-px bg-accent" />
          <CheckoutLine price={details.total} title="Total" />
        </Section>
      ) : null}
    </Section>
  );
}

function CartLine({
  line,
  currency_code,
}: {
  line: OrderLineItemDTO;
  currency_code: string;
}) {
  const price = convertToLocale({
    amount: (line.unit_price || 0) * (line.quantity || 1),
    currency_code,
  });
  return (
    <Section className="mb-3">
      <Row>
        <Column className="mx-0 h-[100px] w-[100px]">
          <Section className="w-fit rounded-lg">
            <Img
              alt="Product image"
              className="rounded-lg border-accent"
              height="100px"
              src={line.thumbnail ?? ""}
              style={{ border: "1px solid" }}
              width="100"
            />
          </Section>
        </Column>
        <Column className="pl-2 align-top">
          <Text
            className="w-full pb-1 font-bold leading-[130%]"
            style={bodySmall}
          >
            {line.product_title}
          </Text>
          <Text
            className="w-full text-inactive leading-[120%]"
            style={bodySmall}
          >
            {line.variant_title}
          </Text>
        </Column>
        <Column align="right" className="align-top">
          <Text className="font-bold leading-[140%]" style={bodySmall}>
            {price}
          </Text>
        </Column>
      </Row>
    </Section>
  );
}

function CheckoutLine({
  title,
  subtitle,
  price,
}: {
  title: string;
  subtitle?: string;
  price: string;
}) {
  return (
    <Row className="mb-3">
      <Column className="w-full">
        <Text className="pb-1 font-bold leading-[150%]" style={bodySmall}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="leading-[150%]" style={bodyXSmall}>
            {subtitle}
          </Text>
        ) : null}
      </Column>
      <Column className="w-fit whitespace-nowrap align-top align-right">
        <Text className="font-bold leading-[150%]" style={bodySmall}>
          {price}
        </Text>
      </Column>
    </Row>
  );
}
