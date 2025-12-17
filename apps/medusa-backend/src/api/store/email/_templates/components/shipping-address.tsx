import { OrderAddressDTO } from "@medusajs/framework/types";
import { Column, Row, Section, Text } from "@react-email/components";
import { bodyLargeLeading, bodySmall, bodyXSmall } from "./style";

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
      <Text className="pb-4 font-bold" style={bodySmall}>
        Customer information
      </Text>
      <Row className="mb-8">
        {shippingAddress?.address_1 && (
          <Column>
            <Text className="pb-2 font-bold" style={bodyXSmall}>
              Shipping address
            </Text>
            <Text style={bodyLargeLeading}>
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
          <Column className="pl-6">
            <Text className="pb-2 font-bold" style={bodyXSmall}>
              Billing address
            </Text>
            <Text style={bodyLargeLeading}>
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
          <Text className="pb-2 font-bold" style={bodyXSmall}>
            Shipping method
          </Text>
          <Text style={bodyLargeLeading}>{method}</Text>
        </>
      )}
    </Section>
  );
}
