import type {PageProps} from "@/types";
import type {Metadata} from "next";

import {retrieveOrder} from "@/lib/data/orders";
import OrderDetailsTemplate from "@/modules/order/templates/order-details-template";
import {notFound} from "next/navigation";

type Props = {
  params: Promise<{id: string}>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const order = await retrieveOrder(params.id).catch(() => null);

  if (!order) {
    notFound();
  }

  return {
    description: "Voir les détails de votre commande",
    title: `Commande #${order.display_id}`,
  };
}

export default async function OrderDetailsPage(props: PageProps<"id">) {
  const params = await props.params;
  const order = await retrieveOrder(params.id).catch(() => null);

  if (!order) {
    notFound();
  }

  return <OrderDetailsTemplate order={order} />;
}
