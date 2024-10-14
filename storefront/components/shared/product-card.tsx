import type {StoreProduct} from "@medusajs/types";

import {getProductPrice} from "@/utils/medusa/get-product-price";
import {cx} from "cva";
import Link from "next/link";

import Tag from "./tag";
import Body from "./typography/body";

export default function ProductCard({
  product,
  size = "default",
}: {
  product: StoreProduct | undefined;
  size?: "PLP" | "default";
}) {
  if (!product) return null;

  const {cheapestPrice} = getProductPrice({product});

  return (
    <Link
      className={cx(
        "flex flex-1 flex-col items-center justify-center rounded-lg",
        {
          "w-[370px] lg:w-[450px]": size === "default",
        },
      )}
      href={`/products/${product?.handle}`}
    >
      <div className="relative w-full">
        <img
          alt={product.title}
          className="aspect-square w-full rounded-lg"
          src={product.thumbnail || product.images?.[0].url}
        />
        {product.type?.value && (
          <Tag
            className="absolute right-4 top-3"
            text={product.type.value || ""}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-1 px-lg py-s">
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
    </Link>
  );
}
