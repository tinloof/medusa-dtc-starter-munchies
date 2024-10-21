"use client";
import type {ButtonProps} from "@/components/shared/button";

import {addToCart} from "@/actions/medusa/cart";
import {Cta} from "@/components/shared/button";
import {track} from "@vercel/analytics";
import {cx} from "cva";
import {useState} from "react";

import {useProductVariants} from "../product-context";

export default function AddToCart({
  region_id,
  variant,
}: {
  region_id: string;
  variant: "PDP" | "sticky";
}) {
  const {activeVariant} = useProductVariants();
  return (
    <AddToCartButton
      className={cx("", {
        "!h-[60px] w-fit": variant === "sticky",
        "w-full": variant === "PDP",
      })}
      label="Add to cart"
      region_id={region_id}
      size={variant === "PDP" ? "xl" : "md"}
      variant={variant === "PDP" ? "outline" : "primary"}
      variantId={activeVariant?.id}
    />
  );
}

export function AddToCartButton({
  label,
  quantity = 1,
  region_id,
  variantId,
  ...buttonProps
}: {
  label: string;
  quantity?: number;
  region_id: string;
  variantId?: string;
} & Omit<ButtonProps, "onClick">) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (
    variantId: string,
    quantity: number,
    region_id: string,
  ) => {
    if (!variantId) return;
    setIsAdding(true);

    await addToCart({
      quantity,
      region_id,
      variantId,
    });

    track("add-to-cart", {quantity, region_id, variantId});

    setIsAdding(false);
  };

  return (
    <Cta
      {...buttonProps}
      loading={isAdding}
      onClick={(e) => {
        e.preventDefault();
        if (variantId) {
          handleAddToCart(variantId, quantity, region_id);
        }
      }}
    >
      {label}
    </Cta>
  );
}
