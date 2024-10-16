import type {StoreProduct} from "@medusajs/types";

import {getProductPrice} from "@/utils/medusa/get-product-price";
import {cx} from "cva";
import Image from "next/image";
import Link from "next/link";

import Tag from "./tag";
import Body from "./typography/body";

export default function ProductCard({
  index,
  product,
  size = "default",
}: {
  index?: number;
  product: StoreProduct | undefined;
  size?: "PLP" | "default" | "dynamicWith";
}) {
  if (!product) return null;

  const {cheapestPrice} = getProductPrice({product});

  return (
    <Link
      className={cx("flex flex-col items-center justify-center rounded-lg", {
        "w-[88vw] max-w-[450px]": size === "default",
        "w-full max-w-[450px]": size === "dynamicWith",
      })}
      href={`/products/${product?.handle}`}
    >
      <div className="relative w-full">
        <Image
          alt={product.title}
          className="aspect-square w-full rounded-lg"
          height={450}
          priority={index !== undefined && index <= 2}
          src={product.thumbnail || product.images?.[0]?.url || ""}
          width={450}
        />
        {product.type?.value && (
          <Tag
            className="absolute right-4 top-3"
            text={product.collection?.title || ""}
          />
        )}
      </div>
      <div className="pointer-events-none flex flex-col items-center justify-center gap-1 px-lg py-s">
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
