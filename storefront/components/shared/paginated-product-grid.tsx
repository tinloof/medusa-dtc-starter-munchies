"use client";
import type {StoreProduct} from "@medusajs/types";

import ProductCard from "@/components/shared/product-card";
import {useEffect, useState} from "react";

export default function ProductGrid({products}: {products: StoreProduct[]}) {
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

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-3">
      {paginatedProducts?.map((product) => {
        return <ProductCard key={product.id} product={product} size="PLP" />;
      })}
    </div>
  );
}
