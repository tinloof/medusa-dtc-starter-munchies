import type {HttpTypes} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {convertToLocale} from "@/lib/util/money";
import Divider from "@/modules/common/components/divider";

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder;
};

const ShippingDetails = ({order}: ShippingDetailsProps) => {
  return (
    <div className="flex flex-col gap-s">
      <Heading desktopSize="xl" font="serif" mobileSize="lg" tag="h2">
        Livraison
      </Heading>
      <div className="flex items-start gap-x-8">
        <div
          className="flex w-1/3 flex-col"
          data-testid="shipping-address-summary"
        >
          <Body
            className="mb-[6px] font-semibold"
            desktopSize="base"
            font="sans"
          >
            Adresse de livraison
          </Body>
          <Body className="font-medium" desktopSize="base" font="sans">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </Body>
          <Body className="font-medium" desktopSize="base" font="sans">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </Body>
          <Body className="font-medium" desktopSize="base" font="sans">
            {order.shipping_address?.postal_code},{" "}
            {order.shipping_address?.city}
          </Body>
          <Body className="font-medium" desktopSize="base" font="sans">
            {order.shipping_address?.country_code?.toUpperCase()}
          </Body>
        </div>

        <div
          className="flex w-1/3 flex-col"
          data-testid="shipping-contact-summary"
        >
          <Body
            className="mb-[6px] font-semibold"
            desktopSize="base"
            font="sans"
          >
            Contact
          </Body>
          <Body className="font-medium" desktopSize="base" font="sans">
            {order.shipping_address?.phone}
          </Body>
          <Body className="font-medium" desktopSize="base" font="sans">
            {order.email}
          </Body>
        </div>

        <div
          className="flex w-1/3 flex-col"
          data-testid="shipping-method-summary"
        >
          <Body
            className="mb-[6px] font-semibold"
            desktopSize="base"
            font="sans"
          >
            Mode
          </Body>
          <Body className="font-medium" desktopSize="base" font="sans">
            {(order as any).shipping_methods[0]?.name} (
            {convertToLocale({
              amount: order.shipping_methods?.[0].total ?? 0,
              currency_code: order.currency_code,
            })
              .replace(/,/g, "")
              .replace(/\./g, ",")}
            )
          </Body>
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  );
};

export default ShippingDetails;
