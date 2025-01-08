import type {Metadata} from "next";

import {retrieveOrder} from "@/lib/data/orders";
// import OrderDetailsTemplate from "@/modules/order/templates/order-details-template";
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
    description: `View your order`,
    title: `Order #${order.display_id}`,
  };
}

export default async function OrderDetailPage(props: Props) {
  const params = await props.params;
  const order = await retrieveOrder(params.id).catch(() => null);

  if (!order) {
    notFound();
  }

  return null; // <OrderDetailsTemplate order={order} />;
}
