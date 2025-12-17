import { OrderLineItemDTO } from "@medusajs/framework/types";
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
        <Text className="w-fit uppercase font-bold" style={bodySmall}>
          Order summary
        </Text>
      </Section>
      {items.map((item) => {
        return (
          <CartLine line={item} key={item.id} currency_code={currency_code} />
        );
      })}
      {details && (
        <Section className="max-w-[365px]" align="right">
          <CheckoutLine title="Subtotal" price={details.subtotal} />
          <CheckoutLine title="Order discount" price={details.discount} />
          <CheckoutLine title="Shipping" price={details.shipping} />
          <CheckoutLine title="Taxes" price={details.taxes} />
          <Hr className="h-px bg-accent mb-4" />
          <CheckoutLine title="Total" price={details.total} />
        </Section>
      )}
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
        <Column className="mx-0 w-[100px] h-[100px]  ">
          <Section className="w-fit rounded-lg">
            <Img
              src={line.thumbnail}
              width="100"
              height="100px"
              style={{ border: "1px solid" }}
              alt="Product image"
              className="rounded-lg border-accent"
            />
          </Section>
        </Column>
        <Column className="pl-2 align-top ">
          <Text
            className="w-full font-bold pb-1 leading-[130%]"
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
        <Text className="font-bold leading-[150%] pb-1" style={bodySmall}>
          {title}
        </Text>
        {subtitle && (
          <Text className="leading-[150%]" style={bodyXSmall}>
            {subtitle}
          </Text>
        )}
      </Column>
      <Column className="align-right w-fit whitespace-nowrap align-top">
        <Text className="font-bold leading-[150%]" style={bodySmall}>
          {price}
        </Text>
      </Column>
    </Row>
  );
}
