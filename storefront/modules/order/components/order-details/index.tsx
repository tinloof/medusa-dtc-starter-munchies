import type {HttpTypes} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import {formatDate} from "@/lib/util/format-date";
import {
  translateFulfillmentStatus,
  translatePaymentStatus,
} from "@/lib/util/translate-status";

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder;
  showStatus?: boolean;
};

const OrderDetails = ({order, showStatus}: OrderDetailsProps) => {
  // const formatStatus = (str: string) => {
  //   const formatted = str.split("_").join(" ");

  //   return formatted.slice(0, 1).toUpperCase() + formatted.slice(1);
  // };

  return (
    <div>
      <Body className="font-medium" desktopSize="xl" font="sans">
        Nous avons envoyé les détails de la confirmation de commande à{" "}
        <span
          className="text-ui-fg-medium-plus font-semibold"
          data-testid="order-email"
        >
          {order.email}
        </span>
      </Body>

      <Body className="mt-2" desktopSize="base" font="sans">
        Date :{" "}
        <span data-testid="order-date">
          {formatDate(new Date(order.created_at))}
        </span>
      </Body>

      <Body className="text-ui-fg-interactive mt-2" font="sans">
        Numéro : <span data-testid="order-id">{order.display_id}</span>
      </Body>

      <div className="text-compact-small mt-4 flex items-center gap-x-4">
        {showStatus && (
          <>
            <Body font="sans">
              Status :{" "}
              <span
                className="text-ui-fg-subtle opacity-80"
                data-testid="order-status"
              >
                {/* TODO: Check where the statuses should come from */}
                {translateFulfillmentStatus(order.fulfillment_status)}
              </span>
            </Body>
            <Body font="sans">
              Paiement :{" "}
              <span
                className="text-ui-fg-subtle opacity-80"
                sata-testid="order-payment-status"
              >
                {translatePaymentStatus(order.payment_status)}
              </span>
            </Body>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
