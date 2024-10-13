"use client";
import type {DICTIONARY_QUERYResult} from "@/types/sanity.generated";
import type {StoreProduct} from "@medusajs/types";

import {Cta} from "@/components/shared/button";
import ProductCard from "@/components/shared/product-card";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {useEffect, useState} from "react";

export default function ProductGrid({
  products,
  productsDictionary,
}: {
  products: StoreProduct[];
  productsDictionary: DICTIONARY_QUERYResult;
}) {
  const [paginatedProducts, setPaginatedProducts] = useState<StoreProduct[]>(
    products || [],
  );

  useEffect(() => {
    if (products) {
      setPaginatedProducts((prevProducts) => [
        ...prevProducts,
        ...products.filter(
          (product) => !prevProducts.some((p) => p.id === product.id),
        ),
      ]);
    }
  }, [products]);
  if (paginatedProducts.length === 0) {
    return (
      <div className="flex w-full flex-col items-start gap-xs py-2xl">
        <Heading font="sans" mobileSize="xs" tag="h2">
          {productsDictionary?.noResultsText}
        </Heading>
        <Body font="sans" mobileSize="lg">
          {productsDictionary?.noResultsDescription}
        </Body>
        <Cta className="mt-3" size="sm" variant="outline">
          Clear filters
        </Cta>
      </div>
    );
  }
  return paginatedProducts?.map((product) => {
    return <ProductCard key={product.id} product={product} size="PLP" />;
  });
}
