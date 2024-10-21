import { OrderAddressDTO } from "@medusajs/framework/types";
import { Column, Row, Section, Text } from "@react-email/components";

type Address = {
  name: string;
  company: string;
  street: string;
  city: string;
  country: string;
};
export default function CustomerInformation({
  method,
  shippingAddress,
  billingAddress,
}: {
  method?: string;
  shippingAddress?: OrderAddressDTO;
  billingAddress?: OrderAddressDTO;
}) {
  return (
    <Section>
      <Text className="mb-4 font-bold">Customer information</Text>
      <Row className="mb-8">
        {shippingAddress?.address_1 && (
          <Column>
            <Text className="mb-2 font-bold">Shipping address</Text>
            <Text>
              {shippingAddress?.first_name + " " + shippingAddress?.last_name}
              <br />
              {shippingAddress?.company}
              <br />
              {shippingAddress?.address_1}
              <br />
              {shippingAddress?.city}
              <br />
            </Text>
          </Column>
        )}
        {billingAddress?.address_1 && (
          <Column>
            <Text className="mb-2 font-bold">Billing address</Text>
            <Text>
              {billingAddress?.first_name + " " + billingAddress?.last_name}
              <br />
              {billingAddress?.company}
              <br />
              {billingAddress?.address_1}
              <br />
              {billingAddress?.city}
              <br />
            </Text>
          </Column>
        )}
      </Row>
      {method && (
        <>
          <Text className="mb-2 font-bold">Shipping method</Text>
          <Text>{method}</Text>
        </>
      )}
    </Section>
  );
}
