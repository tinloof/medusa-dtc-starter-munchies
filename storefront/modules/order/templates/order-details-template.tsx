"use client";

import type {HttpTypes} from "@medusajs/types";

import Heading from "@/components/shared/typography/heading";
import Divider from "@/modules/common/components/divider";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import Help from "@/modules/order/components/help";
import Items from "@/modules/order/components/items";
import OrderDetails from "@/modules/order/components/order-details";
import OrderSummary from "@/modules/order/components/order-summary";
import ShippingDetails from "@/modules/order/components/shipping-details";
import {XMark} from "@medusajs/icons";
import React from "react";

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder;
};

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({order}) => {
  return (
    <div className="flex flex-col justify-center gap-xs">
      <div className="flex items-center justify-between gap-2">
        <Heading desktopSize="xl" font="serif" mobileSize="lg" tag="h2">
          Détails de la commande
        </Heading>
        <LocalizedClientLink
          className="text-ui-fg-subtle hover:text-ui-fg-base flex items-center gap-2"
          data-testid="back-to-overview-button"
          href="/account/orders"
        >
          <XMark /> Retour à l&apos;aperçu
        </LocalizedClientLink>
      </div>
      <div
        className="flex h-full w-full flex-col gap-s"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Divider />
        <Items order={order} />
        <Divider />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  );
};

export default OrderDetailsTemplate;
