"use client";

import type { StoreProduct } from "@medusajs/types";
import { cx } from "class-variance-authority";
import { useMemo } from "react";

import { AddToCartButton } from "@/components/product/AddToCart";
import { getProductPrice } from "@/lib/medusa/get-product-price";

import LocalizedLink from "./LocalizedLink";
import Body from "./typography/Body";

type Props = {
  region_id: string;
  variant?: "PDP" | "cart";
} & StoreProduct;

export function AddonsItem({ region_id, variant = "PDP", ...product }: Props) {
  const { cheapestPrice } = getProductPrice({
    product,
  });

  const default_variant = product.variants?.[0];
  const variantWithProduct = default_variant
    ? { ...default_variant, product }
    : default_variant;

  const size = useMemo(() => {
    if (variant === "PDP") {
      return "md";
    }
    if (variant === "cart") {
      return "sm";
    }
    return null;
  }, [variant]);

  return (
    <LocalizedLink
      className="flex w-full gap-xs"
      href={`/products/${product.handle}`}
    >
      {product.images?.[0]?.url ? (
        <img
          alt={product.title}
          className="aspect-square h-[100px] w-[100px] rounded-lg border-[1.5px] border-accent object-cover"
          height={100}
          src={product.images[0].url}
          width={100}
        />
      ) : null}
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-xs">
          <Body
            className="font-semibold"
            desktopSize="lg"
            font="sans"
            mobileSize="base"
          >
            {product.title}
          </Body>
          <Body desktopSize="base" font="sans" mobileSize="sm">
            {default_variant?.title} / {cheapestPrice?.calculated_price}
          </Body>
        </div>
        <AddToCartButton
          className={cx("self-end", {
            "mr-4": variant === "cart",
          })}
          label="Add +"
          productVariant={variantWithProduct}
          size={size}
          variant="outline"
        />
      </div>
    </LocalizedLink>
  );
}
