import type {Metadata} from "next";

import {retrieveOrder} from "@/lib/data/orders";
import OrderCompletedTemplate from "@/modules/order/templates/order-completed-template";
import {notFound} from "next/navigation";

type Props = {
  params: Promise<{id: string}>;
};
export const metadata: Metadata = {
  description: "Votre commande a été placé avec succès",
  title: "Commande confirmée",
};

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params;
  const order = await retrieveOrder(params.id).catch(() => null);

  if (!order) {
    return notFound();
  }

  // const params = await props.params;
  // const baseOrder = await getOrder(params.id);

  // if (!baseOrder) {
  //   return notFound();
  // }

  // const order = {
  //   ...baseOrder,
  //   items: await enrichLineItems(baseOrder.items, baseOrder.region_id!),
  // };

  return <OrderCompletedTemplate order={order} />;
}
