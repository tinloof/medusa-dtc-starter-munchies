import type {HttpTypes} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import {convertToLocale} from "@/lib/util/money";
import {clx} from "@medusajs/ui";

type LineItemUnitPriceProps = {
  currencyCode: string;
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem;
  style?: "default" | "tight";
};

const LineItemUnitPrice = ({
  currencyCode,
  item,
  style = "default",
}: LineItemUnitPriceProps) => {
  const {original_total, total} = item;

  const hasReducedPrice = total < original_total;

  const percentage_diff = Math.round(
    ((original_total - total) / original_total) * 100,
  );

  function convertMoney(amount?: null | number) {
    return convertToLocale({
      amount: amount ?? 0,
      currency_code: currencyCode,
    });
  }

  return (
    <div className="text-ui-fg-muted flex h-full flex-col justify-center">
      {hasReducedPrice && (
        <>
          <p className="opacity-80">
            {style === "default" && (
              <span className="text-ui-fg-muted">Original: </span>
            )}
            <span
              className="text-secondary line-through"
              data-testid="product-unit-original-price"
            >
              {convertMoney(original_total / item.quantity)}
            </span>
          </p>
          {style === "default" && (
            <span className="text-ui-fg-interactive">-{percentage_diff}%</span>
          )}
        </>
      )}
      <Body
        className={clx("text-base-regular", {
          "text-ui-fg-interactive": hasReducedPrice,
        })}
        data-testid="product-unit-price"
        font="sans"
      >
        {convertMoney(total / item.quantity)}
      </Body>
    </div>
  );
};

export default LineItemUnitPrice;
