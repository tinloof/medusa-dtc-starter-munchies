import type {Metadata} from "next";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {listOrders} from "@/lib/data/orders";
import OrderOverview from "@/modules/account/components/order-overview";
import TransferRequestForm from "@/modules/account/components/transfer-request-form";
import Divider from "@/modules/common/components/divider";
import {notFound} from "next/navigation";

export const metadata: Metadata = {
  description: "Aperçu de vos commandes précédentes.",
  title: "Commandes",
};

export default async function Orders() {
  const orders = await listOrders();

  if (!orders) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <Heading className="text-2xl-semi" tag="h1">
          Commandes
        </Heading>
        <Body className="text-base-regular" font="sans">
          Consultez vos commandes précédentes et suivez leur statut. Vous pouvez
          également initier des retours ou des échanges pour vos commandes, si
          nécessaire.
        </Body>
      </div>
      <div>
        <OrderOverview orders={orders} />
        <Divider className="my-16" />
        <TransferRequestForm />
      </div>
    </div>
  );
}
