"use client";

import type { StoreProduct } from "@medusajs/types";

import { AddonsItem } from "@/components/shared/AddonsItem";
import Heading from "@/components/shared/typography/Heading";

type Props = {
  products: StoreProduct[];
  region_id: string;
  title?: string;
};

export default function Addons({ products, region_id, title }: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-xs rounded-lg bg-secondary p-s">
      <Heading desktopSize="lg" mobileSize="base" tag="h4">
        {title}
      </Heading>
      {products.map((product) => (
        <AddonsItem key={product.id} region_id={region_id} {...product} />
      ))}
    </div>
  );
}
