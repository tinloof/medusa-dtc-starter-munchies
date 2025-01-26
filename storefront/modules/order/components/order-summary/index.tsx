import type {HttpTypes} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {convertToLocale} from "@/lib/util/money";

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder;
};

const OrderSummary = ({order}: OrderSummaryProps) => {
  const getAmount = (amount?: null | number) => {
    if (!amount) {
      return;
    }

    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    });
  };

  return (
    <div className="flex flex-col gap-s">
      <Heading
        className="text-base-semi"
        desktopSize="base"
        font="sans"
        tag="h4"
      >
        Sommaire de la commande
      </Heading>
      <div className="flex flex-col gap-s">
        <SubLineItem
          title="Subtotal"
          value={getAmount(order.item_subtotal) || ""}
        />
        {order.discount_total > 0 && (
          <SubLineItem
            title="Rabais"
            value={`- ${getAmount(order.discount_total)}`}
          />
        )}
        {order.gift_card_total > 0 && (
          <SubLineItem
            title="Carte-cadeau"
            value={`- ${getAmount(order.gift_card_total)}`}
          />
        )}
        <SubLineItem
          title="Livraison"
          value={getAmount(order.shipping_subtotal) || ""}
        />
        <SubLineItem title="Taxes" value={getAmount(order.tax_total) || ""} />
      </div>

      <Separator />

      <div className="flex justify-between">
        <Heading desktopSize="base" font="sans" mobileSize="sm" tag="h4">
          Total
        </Heading>
        <Heading desktopSize="base" font="sans" mobileSize="sm" tag="h4">
          {getAmount(order.total)}
        </Heading>
      </div>
    </div>
  );
};

export function SubLineItem({title, value}: {title: string; value: string}) {
  return (
    <div className="flex items-center justify-between gap-xl">
      <Body className="mb-[6px] font-semibold" desktopSize="base" font="sans">
        {title}
      </Body>
      <Body className="mb-[6px] font-semibold" desktopSize="base" font="sans">
        {value}
      </Body>
    </div>
  );
}

export function Separator() {
  return <div className="h-px w-full bg-accent" />;
}

export default OrderSummary;
