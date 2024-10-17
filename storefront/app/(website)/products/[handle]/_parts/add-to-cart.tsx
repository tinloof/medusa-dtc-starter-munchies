"use client";
import type {ButtonProps} from "@/components/shared/button";

import {addToCart} from "@/actions/medusa/cart";
import {Cta} from "@/components/shared/button";
import {cx} from "cva";
import {useState} from "react";

import {useProductVariants} from "../product-context";

export default function AddToCart({variant}: {variant: "PDP" | "sticky"}) {
  const {activeVariant} = useProductVariants();

  return (
    <AddToCartButton
      className={cx("", {
        "!h-[60px] w-fit": variant === "sticky",
        "w-full": variant === "PDP",
      })}
      label="Add to cart"
      size={variant === "PDP" ? "xl" : "md"}
      variant={variant === "PDP" ? "outline" : "primary"}
      variantId={activeVariant?.id}
    />
  );
}

export function AddToCartButton({
  label,
  quantity = 1,
  variantId,
  ...buttonProps
}: {
  label: string;
  quantity?: number;
  variantId?: string;
} & Omit<ButtonProps, "onClick">) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (variantId: string, quantity: number) => {
    if (!variantId) return;
    setIsAdding(true);

    await addToCart({
      quantity,
      variantId,
    });

    setIsAdding(false);
  };

  return (
    <Cta
      {...buttonProps}
      loading={isAdding}
      onClick={
        variantId ? () => handleAddToCart(variantId, quantity) : undefined
      }
    >
      {label}
    </Cta>
  );
}
