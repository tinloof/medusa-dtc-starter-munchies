import type {HttpTypes} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import LineItemOptions from "@/modules/common/components/line-item-options";
import LineItemPrice from "@/modules/common/components/line-item-price";
import LineItemUnitPrice from "@/modules/common/components/line-item-unit-price";
import Image from "next/image";

type ItemProps = {
  currencyCode: string;
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem;
};

const Item = ({currencyCode, item}: ItemProps) => {
  // const price = convertToLocale({
  //   amount: unit_price * quantity,
  //   currency_code: currency_code,
  // });

  // const unit_price_to_locale = convertToLocale({
  //   amount: unit_price,
  //   currency_code: currency_code,
  // });

  // TODO: Fix the pricing logic...

  return (
    <div className="flex w-full gap-xs">
      {item.thumbnail && (
        <Image
          alt={item.title}
          className="aspect-square h-[100px] w-[100px] rounded-lg border-[1.5px] border-accent"
          height={100}
          src={item.thumbnail}
          width={100}
        />
      )}

      <div className="flex w-full flex-col justify-between">
        <div className="flex justify-between gap-xl">
          <div className="flex flex-col items-start justify-start gap-1">
            <Body className="font-semibold" font="sans" mobileSize="lg">
              {item.product_title}
            </Body>
            <LineItemOptions
              data-testid="product-variant"
              variant={item.variant}
            />
          </div>

          <div className="flex flex-col items-end justify-end gap-1">
            <span className="flex gap-x-1 opacity-80">
              <Body data-testid="product-quantity" font="sans">
                TODO: {item.quantity}
              </Body>{" "}
              x{" "}
              <LineItemUnitPrice
                currencyCode={currencyCode}
                item={item}
                style="tight"
              />
            </span>
            <LineItemPrice
              currencyCode={currencyCode}
              item={item}
              style="tight"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
