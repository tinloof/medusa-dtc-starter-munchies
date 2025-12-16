import type {StoreProduct} from "@medusajs/types";

import {AddToCartButton} from "@/app/[countryCode]/(website)/products/[handle]/_parts/add-to-cart";
import {getProductPrice} from "@/utils/medusa/get-product-price";
import {cx} from "cva";
import Image from "next/image";

import LocalizedLink from "./localized-link";
import Body from "./typography/body";

type Props = {
  region_id: string;
  variant?: "PDP" | "cart";
} & StoreProduct;

export function AddonsItem({region_id, variant = "PDP", ...product}: Props) {
  const {cheapestPrice} = getProductPrice({
    product,
  });

  const default_variant = product.variants?.[0];
  const variantWithProduct = !default_variant
    ? default_variant
    : {...default_variant, product};

  return (
    <LocalizedLink
      className="flex w-full gap-xs"
      href={`/products/${product.handle}`}
      prefetch
    >
      {product.images?.[0].url && (
        <Image
          alt={product.title}
          className="aspect-square h-[100px] w-[100px] rounded-lg border-[1.5px] border-accent"
          height={100}
          src={product.images?.[0].url}
          width={100}
        />
      )}
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
          regionId={region_id}
          size={variant === "PDP" ? "md" : variant === "cart" ? "sm" : null}
          variant="outline"
        />
      </div>
    </LocalizedLink>
  );
}
