"use client";

import type { StoreProductVariant } from "@medusajs/types";
import { cx } from "class-variance-authority";

import type { ButtonProps } from "@/components/shared/Button";
import { Cta } from "@/components/shared/Button";

import { useProductVariants } from "./ProductContext";

export default function AddToCart({
  variant,
}: {
  region_id: string;
  variant: "PDP" | "sticky";
}) {
  const { activeVariant } = useProductVariants();
  return (
    <AddToCartButton
      className={cx("", {
        "h-[60px]! w-fit": variant === "sticky",
        "w-full": variant === "PDP",
      })}
      label="Add to cart"
      productVariant={activeVariant}
      size={variant === "PDP" ? "xl" : "md"}
      variant={variant === "PDP" ? "outline" : "primary"}
    />
  );
}

type AddToCartButtonProps = {
  label: string;
  productVariant: StoreProductVariant | undefined;
} & Omit<ButtonProps, "onClick">;

export function AddToCartButton({
  label,
  productVariant,
  ...buttonProps
}: AddToCartButtonProps) {
  const handleAddToCart = () => {
    if (!productVariant) {
      return;
    }
    // Add to cart functionality will be added later
    console.log("Add to cart:", productVariant.id);
  };

  return (
    <Cta
      {...buttonProps}
      disabled={!productVariant}
      onClick={(e) => {
        e.preventDefault();
        if (productVariant) {
          handleAddToCart();
        }
      }}
    >
      {label}
    </Cta>
  );
}
