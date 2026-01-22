"use client";

import type { StoreProduct, StoreProductVariant } from "@medusajs/types";
import type React from "react";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

type ProductVariantsContextType = {
  activeVariant: StoreProductVariant | undefined;
  selectedOptions: Record<string, string | undefined>;
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
};

const ProductVariantsContext = createContext<
  ProductVariantsContextType | undefined
>(undefined);

export function ProductVariantsProvider({
  children,
  initialSelectedOptions,
  product,
}: PropsWithChildren<{
  initialSelectedOptions?: Record<string, string | undefined>;
  product: StoreProduct;
}>) {
  // Initialize from server-provided options or fall back to first option values
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string | undefined>>(() => {
    if (initialSelectedOptions && Object.keys(initialSelectedOptions).length > 0) {
      return initialSelectedOptions;
    }
    const initial: Record<string, string | undefined> = {};
    product.options?.forEach((option) => {
      initial[option.title.toLowerCase()] = option.values?.[0]?.value.toLowerCase() ?? "";
    });
    return initial;
  });

  // Update URL when options change
  const handleSetSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  > = (value) => {
    setSelectedOptions((prev) => {
      const newValue = typeof value === "function" ? value(prev) : value;

      // Update URL
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        Object.entries(newValue).forEach(([key, val]) => {
          if (val) {
            url.searchParams.set(key, val);
          }
        });
        window.history.pushState({}, "", url.toString());
      }

      return newValue;
    });
  };

  const activeVariant =
    product.variants?.find((variant) =>
      variant?.options?.every(
        ({ option, value }) =>
          selectedOptions[option?.title.toLowerCase() || ""] ===
          value.toLowerCase()
      )
    ) || product.variants?.[0];

  const activeVariantWithProduct = activeVariant
    ? { ...activeVariant, product }
    : activeVariant;

  return (
    <ProductVariantsContext.Provider
      value={{
        activeVariant: activeVariantWithProduct,
        selectedOptions,
        setSelectedOptions: handleSetSelectedOptions,
      }}
    >
      {children}
    </ProductVariantsContext.Provider>
  );
}

export function useProductVariants() {
  const context = useContext(ProductVariantsContext);
  if (context === undefined) {
    throw new Error(
      "useProductVariants must be used within a ProductVariantsProvider"
    );
  }
  return context;
}
