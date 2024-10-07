"use client";
import type {StoreProduct} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import {getProductPrice} from "@/utils/medusa/get-product-price";

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

  return (
    (variantPrice?.calculated_price || cheapestPrice?.calculated_price) && (
      <Body desktopSize="xl" font="sans" mobileSize="lg">
        {variantPrice?.calculated_price ? (
          variantPrice.calculated_price
        ) : (
          <>from {cheapestPrice?.calculated_price}</>
        )}
      </Body>
    )
  );
}
