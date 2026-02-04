import type { StoreProduct } from "@medusajs/types";
import { cx } from "class-variance-authority";
import { NuqsAdapter } from "nuqs/adapters/react";
import { useEffect, useState } from "react";
import { AddToCart } from "../cart/add-to-cart";
import { ProductVariantsProvider } from "../context/product-context";
import { OptionsSelect } from "./options-select";

interface StickyAtcProps {
  regionId: string;
  searchParams: string;
  product: StoreProduct;
}

export function StickyAtc({ regionId, searchParams, product }: StickyAtcProps) {
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
    <NuqsAdapter>
      <ProductVariantsProvider product={product} searchParams={searchParams}>
        <div
          className={cx(
            "fixed right-0 bottom-0 left-0 z-80 w-screen min-w-80 border-accent border-t bg-background p-m transition-transform duration-300 lg:hidden",
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
            <AddToCart regionId={regionId} variant="sticky" />
          </div>
        </div>
      </ProductVariantsProvider>
    </NuqsAdapter>
  );
}
