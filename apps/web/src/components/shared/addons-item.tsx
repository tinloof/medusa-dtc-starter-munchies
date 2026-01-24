import type { StoreProduct } from "@medusajs/types";
import { cx } from "class-variance-authority";
import { useMemo } from "react";
import { getProductPrice } from "@/lib/utils/medusa/get-product-price";
import { Cta } from "./button";
import { LocalizedLink } from "./localized-link";
import { Body } from "./typography/body";

type Props = {
  variant?: "PDP" | "cart";
} & StoreProduct;

export function AddonsItem({ variant = "PDP", ...product }: Props) {
  const { cheapestPrice } = getProductPrice({
    product,
  });

  const default_variant = product.variants?.[0];

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
      {product.images?.[0].url ? (
        <img
          alt={product.title}
          className="aspect-square size-25 rounded-lg border-[1.5px] border-accent"
          height={100}
          src={product.images?.[0].url}
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
        <Cta
          className={cx("self-end", {
            "mr-4": variant === "cart",
          })}
          size={size}
          variant="outline"
        >
          Add +
        </Cta>
      </div>
    </LocalizedLink>
  );
}
