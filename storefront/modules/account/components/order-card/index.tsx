import type {HttpTypes} from "@medusajs/types";

import {convertToLocale} from "@/lib/util/money";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import Thumbnail from "@/modules/products/thumbnail";
import {Button} from "@medusajs/ui";
import {useMemo} from "react";

type OrderCardProps = {
  order: HttpTypes.StoreOrder;
};

const OrderCard = ({order}: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0) ?? 0
    );
  }, [order]);

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0;
  }, [order]);

  return (
    <div className="flex flex-col bg-white" data-testid="order-card">
      <div className="text-large-semi mb-1 uppercase">
        #<span data-testid="order-display-id">{order.display_id}</span>
      </div>
      <div className="text-small-regular text-ui-fg-base flex items-center divide-x divide-gray-200">
        <span className="pr-2" data-testid="order-created-at">
          {new Date(order.created_at).toDateString()}
        </span>
        <span className="px-2" data-testid="order-amount">
          {convertToLocale({
            amount: order.total,
            currency_code: order.currency_code,
          })}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? "items" : "item"
        }`}</span>
      </div>
      <div className="my-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {order.items?.slice(0, 3).map((i) => {
          return (
            <div
              className="flex flex-col gap-y-2"
              data-testid="order-item"
              key={i.id}
            >
              <Thumbnail
                images={[]}
                size="full"
                thumbnail="/sections/section.hero.png"
              />
              <div className="text-small-regular text-ui-fg-base flex items-center">
                <span
                  className="text-ui-fg-base font-semibold"
                  data-testid="item-title"
                >
                  {i.title}
                </span>
                <span className="ml-2">x</span>
                <span data-testid="item-quantity">{i.quantity}</span>
              </div>
            </div>
          );
        })}
        {numberOfProducts > 4 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <span className="text-small-regular text-ui-fg-base">
              + {numberOfLines - 4}
            </span>
            <span className="text-small-regular text-ui-fg-base">more</span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button data-testid="order-details-link" variant="secondary">
            See details
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default OrderCard;
