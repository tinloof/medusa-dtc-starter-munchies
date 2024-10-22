"use client";

import type {StoreProduct, StoreProductVariant} from "@medusajs/types";
import type {PropsWithChildren} from "react";

import {parseAsString, useQueryStates} from "nuqs";
import React, {createContext, useContext} from "react";

interface ProductVariantsContextType {
  activeVariant: StoreProductVariant | undefined;
  selectedOptions: Record<string, string | undefined>;
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
}

const ProductVariantsContext = createContext<
  ProductVariantsContextType | undefined
>(undefined);

export function ProductVariantsProvider({
  children,
  product,
}: PropsWithChildren<{
  product: StoreProduct;
}>) {
  const [selectedOptions, setSelectedOptions] = useQueryStates(
    Object.fromEntries(
      product.options?.map((option) => [
        option.title.toLowerCase(),
        parseAsString.withDefault(
          option.values?.[0]?.value.toLowerCase() ?? "",
        ),
      ]) ?? [],
    ),
    {
      history: "push",
    },
  );

  const activeVariant =
    product.variants?.find((variant) => {
      return variant?.options?.every(
        ({option, value}) =>
          selectedOptions[option?.title.toLowerCase() || ""] ===
          value.toLowerCase(),
      );
    }) || product.variants?.[0];

  const activeVariantWithProduct = !activeVariant
    ? activeVariant
    : {...activeVariant, product};

  return (
    <ProductVariantsContext.Provider
      value={{
        activeVariant: activeVariantWithProduct,
        selectedOptions,
        setSelectedOptions,
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
      "useProductVariants must be used within a ProductVariantsProvider",
    );
  }
  return context;
}
