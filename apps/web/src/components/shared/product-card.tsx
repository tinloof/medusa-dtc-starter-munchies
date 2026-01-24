import type { StoreProduct } from "@medusajs/types";
import { cx } from "class-variance-authority";
import { getProductPrice } from "@/lib/utils/medusa/get-product-price";
import { LocalizedLink } from "./localized-link";
import { Tag } from "./tag";
import { Body } from "./typography/body";

export function ProductCard({
  product,
  size = "default",
}: {
  product: StoreProduct | undefined;
  size?: "PLP" | "default";
}) {
  if (!product) {
    return null;
  }

  const { cheapestPrice } = getProductPrice({ product });

  const thumbnail = product.thumbnail || product.images?.[0]?.url;

  return (
    <LocalizedLink
      className={cx(
        "flex flex-1 flex-col items-center justify-center rounded-lg",
        {
          "w-[88vw] max-w-112.5": size === "default",
        }
      )}
      href={`/products/${product?.handle}`}
    >
      <div className="relative w-full">
        {thumbnail ? (
          <img
            alt={product.title}
            className="aspect-square w-full rounded-lg"
            height={450}
            src={thumbnail}
            width={450}
          />
        ) : null}
        {product.type?.value ? (
          <Tag
            className="absolute top-3 right-4"
            text={product.type.value || ""}
          />
        ) : null}
      </div>

      <div className="pointer-events-none flex flex-1 flex-col items-center justify-center gap-1 px-lg py-s">
        <Body
          className="text-center"
          desktopSize="xl"
          font="sans"
          mobileSize="lg"
        >
          {product.title}
        </Body>
        <Body
          className="text-center"
          desktopSize="base"
          font="sans"
          mobileSize="sm"
        >
          from {cheapestPrice?.calculated_price || "NA"}
        </Body>
      </div>
    </LocalizedLink>
  );
}
