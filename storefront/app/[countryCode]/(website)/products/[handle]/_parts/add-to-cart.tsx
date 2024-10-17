"use client";
import type {ButtonProps} from "@/components/shared/button";

import {addToCart} from "@/actions/medusa/cart";
import {Cta} from "@/components/shared/button";
import {useState} from "react";

import {useProductVariants} from "../product-context";

export default function AddToCart({region_id}: {region_id: string}) {
  const {activeVariant} = useProductVariants();
  return (
    <AddToCartButton
      className="w-full"
      label="Add to cart"
      region_id={region_id}
      size="xl"
      variant="outline"
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

    setIsAdding(false);
  };

  return (
    <Cta
      {...buttonProps}
      loading={isAdding}
      onClick={
        variantId
          ? () => handleAddToCart(variantId, quantity, region_id)
          : undefined
      }
    >
      {label}
    </Cta>
  );
}
