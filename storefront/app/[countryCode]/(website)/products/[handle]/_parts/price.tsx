"use client";
import type {StoreProduct} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import {getProductPrice} from "@/utils/medusa/get-product-price";
import {Badge, clx} from "@medusajs/ui";

import {useProductVariants} from "../product-context";

export default function Price({
  product,
}: {
  product: Pick<StoreProduct, "id" | "variants">;
}) {
  const {activeVariant} = useProductVariants();

  const {cheapestPrice, variantPrice} = getProductPrice({
    product,
    variantId: activeVariant?.id,
  });

  const selectedPrice = activeVariant ? variantPrice : cheapestPrice;

  if (!selectedPrice) {
    return <div className="block h-9 w-32 animate-pulse bg-gray-100" />;
  }

  return (
    // (variantPrice?.calculated_price || cheapestPrice?.calculated_price) && (
    //   <Body desktopSize="xl" font="sans" mobileSize="lg">
    //     {variantPrice?.calculated_price ? (
    //       variantPrice.calculated_price
    //     ) : (
    //       <>À partir de {cheapestPrice?.calculated_price}</>
    //     )}
    //   </Body>
    // )
    <div className="flex flex-row items-center gap-2">
      <Body
        className={clx("text-2xl font-semibold", {
          "text-destructive": selectedPrice.price_type === "sale",
        })}
        font="sans"
      >
        {!activeVariant && "À partir de "}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </Body>
      {selectedPrice.price_type === "sale" && (
        <>
          <Body
            className="line-through opacity-80"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
            font="sans"
          >
            {selectedPrice.original_price}
          </Body>
          <Badge className="bg-secondary font-semibold">
            -{selectedPrice.percentage_diff}%
          </Badge>
        </>
      )}
    </div>
  );
}
