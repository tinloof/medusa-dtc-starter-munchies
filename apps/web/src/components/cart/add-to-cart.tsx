import type { StoreProductVariant } from "@medusajs/types";
import { cx } from "class-variance-authority";
import type { ButtonProps } from "@/components/shared/button";
import { Cta } from "@/components/shared/button";
import { addToCartEventBus } from "../context/cart/event-bus";
import { useProductVariants } from "../context/product-context";

export function AddToCart({
  regionId,
  variant,
}: {
  regionId: string;
  variant: "PDP" | "sticky";
}) {
  const { activeVariant } = useProductVariants();
  return (
    <AddToCartButton
      className={cx("", {
        "h-15! w-fit": variant === "sticky",
        "w-full": variant === "PDP",
      })}
      label="Add to cart"
      productVariant={activeVariant}
      regionId={regionId}
      size={variant === "PDP" ? "xl" : "md"}
      variant={variant === "PDP" ? "outline" : "primary"}
    />
  );
}

type AddToCartButtonProps = {
  label: string;
  productVariant: StoreProductVariant | undefined;
  regionId: string;
} & Omit<ButtonProps, "onClick">;

export function AddToCartButton({
  label,
  productVariant,
  regionId,
  ...buttonProps
}: AddToCartButtonProps) {
  const handleAddToCart = () => {
    if (!productVariant) {
      return;
    }

    addToCartEventBus.emitCartAdd({
      productVariant,
      regionId,
    });

    // TODO: Add analytics
    // track("add-to-cart", {
    //   quantity: 1,
    //   region_id: regionId,
    //   variantId: productVariant.id,
    // });
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
