import type {StoreProduct} from "@medusajs/types";

import {getProductPrice} from "@/utils/medusa/get-product-price";
import {cx} from "cva";
import Image from "next/image";

import LocalizedLink from "./localized-link";
import Tag from "./tag";
import Body from "./typography/body";

export default function ProductCard({
  index,
  product,
  size = "default",
}: {
  index?: number;
  product: StoreProduct | undefined;
  size?: "PLP" | "default";
}) {
  if (!product) return null;

  const {cheapestPrice} = getProductPrice({product});

  const thumbnail = product.thumbnail || product.images?.[0]?.url;

  return (
    <LocalizedLink
      className={cx(
        "flex flex-1 flex-col items-center justify-center rounded-lg",
        {
          "w-[88vw] max-w-[450px]": size === "default",
        },
      )}
      href={`/products/${product?.handle}`}
      prefetch
    >
      <div className="relative w-full">
        {thumbnail && (
          <Image
            alt={product.title}
            className="aspect-square w-full rounded-lg"
            height={450}
            priority={index !== undefined && index <= 2}
            src={thumbnail}
            width={450}
          />
        )}
        {product.type?.value && (
          <Tag
            className="absolute right-4 top-3"
            text={product.type.value || ""}
          />
        )}
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
