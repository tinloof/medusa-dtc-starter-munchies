import type { StoreProduct } from "@medusajs/types";
import { useProductVariants } from "@/components/context/product-context";
import { Body } from "@/components/shared/typography/body";
import { getProductPrice } from "@/lib/utils/medusa/get-product-price";

export function Price({
  product,
}: {
  product: Pick<StoreProduct, "id" | "variants">;
}) {
  const { activeVariant } = useProductVariants();

  const { cheapestPrice, variantPrice } = getProductPrice({
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
