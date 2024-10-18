import { Column, Row, Section, Text } from "@react-email/components";
import React from "react";

type Address = {
  name: string;
  company: string;
  street: string;
  city: string;
  country: string;
};
export default function CustomerInformation({
  method,
  ShippingAddress,
  BillingAddress,
}: {
  method: string;
  ShippingAddress: Address;
  BillingAddress: Address;
}) {
  return (
    <Section>
      <Text className="mb-4 font-bold">Customer information</Text>
      <Row className="mb-8">
        <Column>
          <Text className="mb-2 font-bold">Shipping address</Text>
          <Text>
            {ShippingAddress.name}
            <br />
            {ShippingAddress.company}
            <br />
            {ShippingAddress.street}
            <br />
            {ShippingAddress.city}
            <br />
            {ShippingAddress.country}
            <br />
          </Text>
        </Column>
        <Column>
          <Text className="mb-2 font-bold">Billing address</Text>
          <Text>
            {BillingAddress.name}
            <br />
            {BillingAddress.company}
            <br />
            {BillingAddress.street}
            <br />
            {BillingAddress.city}
            <br />
            {BillingAddress.country}
            <br />
          </Text>
        </Column>
      </Row>
      <Text className="mb-2 font-bold">Shipping method</Text>
      <Text>{method}</Text>
    </Section>
  );
}
