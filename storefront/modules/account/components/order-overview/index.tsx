"use client";

import type {HttpTypes} from "@medusajs/types";

import {Link} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";

import OrderCard from "../order-card";

const OrderOverview = ({orders}: {orders: HttpTypes.StoreOrder[]}) => {
  if (orders?.length) {
    return (
      <div className="flex w-full flex-col gap-y-8">
        {orders.map((o) => (
          <div
            className="border-b border-accent-40 pb-6 last:border-none last:pb-0"
            key={o.id}
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex w-full flex-col items-center gap-y-4"
      data-testid="no-orders-container"
    >
      <Heading
        className="text-large-semi"
        desktopSize="lg"
        font="sans"
        tag="h2"
      >
        Rien à voir ici
      </Heading>
      <Body className="text-base-regular" font="sans">
        Vous n&apos;avez pas encore de commandes, changeons cela {":)"}
      </Body>
      <div className="mt-4">
        <Link data-testid="continue-shopping-button" href="/products">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
};

export default OrderOverview;
