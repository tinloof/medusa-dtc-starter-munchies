"use client";

import type {StoreProductOption, StoreProductVariant} from "@medusajs/types";
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
  options,
  variants,
}: PropsWithChildren<{
  options?: StoreProductOption[] | null;
  variants: StoreProductVariant[] | null;
}>) {
  const [selectedOptions, setSelectedOptions] = useQueryStates(
    Object.fromEntries(
      options?.map((option) => [
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
    variants?.find((variant) => {
      return variant?.options?.every(
        ({option, value}) =>
          selectedOptions[option?.title.toLowerCase() || ""] ===
          value.toLowerCase(),
      );
    }) || variants?.[0];

  return (
    <ProductVariantsContext.Provider
      value={{activeVariant, selectedOptions, setSelectedOptions}}
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
