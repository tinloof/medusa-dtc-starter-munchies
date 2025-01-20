import type {HttpTypes} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import {formatDate} from "@/lib/util/format-date";
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
    <div className="flex flex-col" data-testid="order-card">
      <div className="text-large-semi mb-1 uppercase">
        #
        <Body data-testid="order-display-id" font="sans">
          {order.display_id}
        </Body>
      </div>
      <div className="text-small-regular text-ui-fg-base flex items-center divide-x divide-accent-40">
        <Body className="pr-2" data-testid="order-created-at" font="sans">
          {formatDate(new Date(order.created_at))}
        </Body>
        <Body className="px-2" data-testid="order-amount" font="sans">
          {convertToLocale({
            amount: order.total,
            currency_code: order.currency_code,
          })}
        </Body>
        <Body className="pl-2" font="sans">{`${numberOfLines} ${
          numberOfLines > 1 ? "articles" : "article"
        }`}</Body>
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
                className="rounded-xl border-accent"
                images={[]}
                size="square"
                thumbnail="/sections/section.hero.png"
              />
              <div className="text-small-regular text-ui-fg-base flex items-center">
                <Body
                  className="text-ui-fg-base font-semibold"
                  data-testid="item-title"
                  font="sans"
                >
                  {i.title}
                </Body>
                <Body className="ml-2" font="sans">
                  x
                </Body>
                <Body data-testid="item-quantity" font="sans">
                  {i.quantity}
                </Body>
              </div>
            </div>
          );
        })}
        {numberOfProducts > 4 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Body className="text-small-regular text-ui-fg-base" font="sans">
              + {numberOfLines - 4}
            </Body>
            <Body className="text-small-regular text-ui-fg-base" font="sans">
              de plus
            </Body>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button data-testid="order-details-link" variant="secondary">
            Voir les détails
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default OrderCard;
