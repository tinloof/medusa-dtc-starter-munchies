"use client";
import {addToCart} from "@/actions/medusa/cart";
import {Cta} from "@/components/shared/button";
import {useState} from "react";

import {useProductVariants} from "../product-context";

export default function AddToCart() {
  const [isAdding, setIsAdding] = useState(false);
  const {activeVariant} = useProductVariants();

  const handleAddToCart = async () => {
    if (!activeVariant?.id) return;
    setIsAdding(true);

    await addToCart({
      quantity: 1,
      variantId: activeVariant?.id,
    });

    setIsAdding(false);
  };

  return (
    <Cta
      className="w-full"
      onClick={handleAddToCart}
      size="xl"
      variant="outline"
    >
      {isAdding ? "Adding..." : "Add to cart"}
    </Cta>
  );
}
