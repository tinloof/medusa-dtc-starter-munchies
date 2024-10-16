import type { StoreProduct } from "@medusajs/types";

import { AddToCartButton } from "@/app/(website)/products/[handle]/_parts/add-to-cart";
import { getProductPrice } from "@/utils/medusa/get-product-price";
import Image from "next/image";

import Body from "./typography/body";

type Props = {
  variant?: "PDP" | "cart";
} & StoreProduct;

export function AddonsItem({
  id,
  images,
  title,
  variant = "PDP",
  variants,
}: Props) {
  const {cheapestPrice} = getProductPrice({
    product: {
      id,
      variants,
    },
  });

  const default_variant = variants?.[0]

  return (
    <div className="flex w-full gap-xs">
      {images?.[0].url && (
        <Image
          alt={title}
          className="aspect-square h-[100px] w-[100px] rounded-lg border-[1.5px] border-accent"
          height={100}
          src={images?.[0].url}
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
            {title}
          </Body>
          <Body desktopSize="base" font="sans" mobileSize="sm">
            {default_variant?.title} / {cheapestPrice?.calculated_price}
          </Body>
        </div>
        <AddToCartButton
          className="self-end"
          label="Add +"
          size={variant === "PDP" ? "md" : variant === "cart" ? "sm" : null}
          variant="outline"
          variantId={default_variant?.id}
        />
      </div>
    </div>
  );
}
