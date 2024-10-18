import { Column, Hr, Row, Section, Text } from "@react-email/components";
import { BodySmall, BodyXSmall } from "./style";

export default function Cart({
  checkout,
}: {
  date?: string;
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
      <CartLine />
      <CartLine />
      {checkout && (
        <Section className="max-w-[365px]" align="right">
          <CheckoutLine title="Subtotal" price={checkout.Subtotal} />
          <CheckoutLine
            title="Order discount"
            subtitle="ORDER5 (-$5.00)"
            price={checkout.discount}
          />
          <CheckoutLine
            title="Shipping"
            subtitle="FREESHIPPING (-$0.00)"
            price={checkout.shipping}
          />
          <CheckoutLine title="Taxes" price={checkout.taxes} />
          <Hr className="h-px bg-accent mb-4" />
          <CheckoutLine title="Total" price={checkout.total} />
        </Section>
      )}
    </Section>
  );
}

function CartLine() {
  return (
    <Section className="mb-3">
      <Row>
        <Column className="mx-0 w-[100px] h-[100px]  ">
          <Section className="w-fit ">
            {/* <Img
                    src={`${baseUrl}/static/emails/product.png`}
              width="100"
              height="100px"
              alt="Product image"
              className=""
            /> */}
            <Section className="h-[100px] w-[100px] bg-accent"></Section>
          </Section>
        </Column>
        <Column className="pl-2 align-top ">
          <Text className="w-full font-bold leading-[130%]" style={BodySmall}>
            Two chip chocolate chip cookie
          </Text>
          <Text
            className="w-full text-inactive leading-[120%]"
            style={BodySmall}
          >
            4-Pack
          </Text>
        </Column>
        <Column align="right" className="align-top">
          <Text className="font-bold leading-[140%]" style={BodySmall}>
            $20.00
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
