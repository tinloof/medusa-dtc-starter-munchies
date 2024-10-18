import { OrderLineItemDTO } from "@medusajs/framework/types";
import { Column, Hr, Img, Row, Section, Text } from "@react-email/components";
import { convertToLocale } from "../utils";
import { BodySmall, BodyXSmall } from "./style";

export default function Cart({
  checkout,
  items,
  currency_code,
}: {
  date?: string;
  items: OrderLineItemDTO[];
  currency_code: string;
  checkout?: {
    Subtotal: string;
    discount: string;
    shipping: string;
    taxes: string;
    total: string;
  };
}) {
  return (
    <Section className="mb-10">
      <Section className="mb-4">
        <Text className="w-fit uppercase leading-[110%]" style={BodySmall}>
          Order summary
        </Text>
      </Section>
      {items.map((item) => {
        return (
          <CartLine line={item} key={item.id} currency_code={currency_code} />
        );
      })}
      {checkout && (
        <Section className="max-w-[365px]" align="right">
          <CheckoutLine title="Subtotal" price={checkout.Subtotal} />
          <CheckoutLine
            title="Order discount"
            subtitle="ORDER5 (-$5.00)"
            price={checkout.discount}
          />
          <CheckoutLine title="Shipping" price={checkout.shipping} />
          <CheckoutLine title="Taxes" price={checkout.taxes} />
          <Hr className="h-px bg-accent mb-4" />
          <CheckoutLine title="Total" price={checkout.total} />
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
          <Section
            className="w-fit border-accent rounded-lg"
            style={{ border: "1px solid" }}
          >
            <Img
              src={line.thumbnail}
              width="100"
              height="100px"
              alt="Product image"
              className=""
            />
          </Section>
        </Column>
        <Column className="pl-2 align-top ">
          <Text className="w-full font-bold leading-[130%]" style={BodySmall}>
            {line.product_title}
          </Text>
          <Text
            className="w-full text-inactive leading-[120%]"
            style={BodySmall}
          >
            {line.variant_title}
          </Text>
        </Column>
        <Column align="right" className="align-top">
          <Text className="font-bold leading-[140%]" style={BodySmall}>
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
        <Text className="font-bold leading-[150%] mb-1" style={BodySmall}>
          {title}
        </Text>
        {subtitle && (
          <Text className="leading-[150%]" style={BodyXSmall}>
            {subtitle}
          </Text>
        )}
      </Column>
      <Column className="align-right w-fit whitespace-nowrap align-top">
        <Text className="font-bold leading-[150%]" style={BodySmall}>
          {price}
        </Text>
      </Column>
    </Row>
  );
}
