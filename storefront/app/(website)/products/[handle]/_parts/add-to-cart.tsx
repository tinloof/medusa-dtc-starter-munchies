"use client";
import type {ButtonProps} from "@/components/shared/button";

import {addToCart} from "@/actions/medusa/cart";
import {Cta} from "@/components/shared/button";
import {useState} from "react";

import {useProductVariants} from "../product-context";

export default function AddToCart() {
  const {activeVariant} = useProductVariants();

  return (
    <AddToCartButton
      className="w-full"
      label="Add to cart"
      loadingLabel="Adding..."
      size="xl"
      variant="outline"
      variantId={activeVariant?.id}
    />
  );
}

export function AddToCartButton({
  label,
  loadingLabel,
  quantity = 1,
  variantId,
  ...buttonProps
}: {
  label: string;
  loadingLabel?: string;
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
      onClick={
        variantId ? () => handleAddToCart(variantId, quantity) : undefined
      }
    >
      {isAdding ? (loadingLabel ? loadingLabel : label) : label}
    </Cta>
  );
}
