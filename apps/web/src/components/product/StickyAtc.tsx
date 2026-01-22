"use client";

import type { StoreProduct } from "@medusajs/types";

import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";

import { ProductVariantsProvider } from "./ProductContext";
import AddToCart from "./AddToCart";
import OptionsSelect from "./Options";

export default function StickyAtc({
  initialSelectedOptions,
  region_id,
  ...product
}: { initialSelectedOptions?: Record<string, string | undefined>; region_id: string } & StoreProduct) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        setIsVisible(rect.top > window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ProductVariantsProvider initialSelectedOptions={initialSelectedOptions} product={product}>
      <div
        className={cx(
          "fixed right-0 bottom-0 left-0 z-80 w-screen min-w-[320px] border-accent border-t bg-background p-m transition-transform duration-300 lg:hidden",
          {
            "translate-y-0": isVisible,
            "translate-y-full": !isVisible,
          }
        )}
      >
        <div className="flex items-center justify-center gap-3">
          {product.options?.some(
            (option) => (option.values?.length || 0) > 1
          ) && (
            <div className="w-fit">
              <OptionsSelect options={product.options} />
            </div>
          )}
          <AddToCart region_id={region_id} variant="sticky" />
        </div>
      </div>
    </ProductVariantsProvider>
  );
}
