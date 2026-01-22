import { cx } from "class-variance-authority";
import { getProductPrice } from "@/lib/medusa/get-product-price";
import config from "@/config";

import Tag from "./Tag";
import Body from "./typography/Body";
import type { HttpTypes } from "@medusajs/types";

interface ProductCardProps {
  countryCode?: string;
  index?: number;
  product: HttpTypes.StoreProduct | undefined;
  size?: "PLP" | "default";
}

export default function ProductCard({
  countryCode = config.defaultCountryCode,
  index,
  product,
  size = "default",
}: ProductCardProps) {
  if (!product) {
    return null;
  }

  const { cheapestPrice } = getProductPrice({ product });
  const thumbnail = product.thumbnail || product.images?.[0]?.url;

  const isDefaultCountry = countryCode === config.defaultCountryCode;
  const href = isDefaultCountry
    ? `/products/${product?.handle}`
    : `/${countryCode}/products/${product?.handle}`;

  return (
    <a
      className={cx(
        "flex flex-1 flex-col items-center justify-center rounded-lg",
        {
          "w-[88vw] max-w-112.5": size === "default",
        }
      )}
      href={href}
    >
      <div className="relative w-full">
        {thumbnail ? (
          <img
            alt={product.title}
            className="aspect-square w-full rounded-lg object-cover"
            loading={index !== undefined && index <= 2 ? "eager" : "lazy"}
            src={thumbnail}
            width={450}
            height={450}
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
    </a>
  );
}
