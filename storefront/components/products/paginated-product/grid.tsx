"use client";
import type {StoreProduct} from "@medusajs/types";

import ProductCard from "@/components/shared/product-card";
import {useEffect, useState} from "react";

export default function ProductGrid({products}: {products: StoreProduct[]}) {
  const [paginatedProducts, setPaginatedProducts] = useState<StoreProduct[]>(
    products || [],
  );

  useEffect(() => {
    setPaginatedProducts(products);
  }, [products]);

  return paginatedProducts?.map((product) => {
    return <ProductCard key={product.id} product={product} size="PLP" />;
  });
}
