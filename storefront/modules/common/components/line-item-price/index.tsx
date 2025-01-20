import type {HttpTypes} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import {getPercentageDiff} from "@/lib/util/get-precentage-diff";
import {convertToLocale} from "@/lib/util/money";
import {clx} from "@medusajs/ui";

type LineItemPriceProps = {
  currencyCode: string;
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem;
  style?: "default" | "tight";
};

const LineItemPrice = ({
  currencyCode,
  item,
  style = "default",
}: LineItemPriceProps) => {
  const {original_total, total} = item;

  // const adjustmentsSum = (item.adjustments || []).reduce(
  //   (acc, adjustment) => adjustment.amount + acc,
  //   0,
  // );

  const originalPrice = original_total;
  const currentPrice = total;
  const hasReducedPrice = currentPrice < originalPrice;

  function convertMoney(amount?: null | number) {
    return convertToLocale({
      amount: amount ?? 0,
      currency_code: currencyCode,
    });
  }

  return (
    <div className="text-ui-fg-subtle flex flex-col items-end gap-x-2">
      <div className="text-left">
        {hasReducedPrice && (
          <>
            <p className="opacity-80">
              {style === "default" && (
                <span className="text-ui-fg-subtle">Original: </span>
              )}
              <span
                className="text-ui-fg-muted text-secondary line-through"
                data-testid="product-original-price"
              >
                {convertMoney(originalPrice)}
              </span>
            </p>
            {style === "default" && (
              <Body className="text-ui-fg-interactive">
                -{getPercentageDiff(originalPrice, currentPrice || 0)}%
              </Body>
            )}
          </>
        )}
        <Body
          className={clx("text-base-regular", {
            "text-ui-fg-interactive": hasReducedPrice,
          })}
          data-testid="product-price"
          font="sans"
        >
          {convertMoney(currentPrice)}
        </Body>
      </div>
    </div>
  );
};

export default LineItemPrice;
