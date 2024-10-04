import type { PageProps } from "@/types";

import { getProductByHandle } from "@/data/medusa/products";
import { getRegion } from "@/data/medusa/regions";
import { notFound } from "next/navigation";

type ProductPageProps = PageProps<"handle">;

export default async function ProductPage({params}: ProductPageProps) {
  const region = await getRegion(
    process.env.NEXT_PUBLIC_MEDUSA_DEFAULT_COUNTRY_CODE!,
  );

  if (!region) {
    console.log("No region found");
    return notFound();
  }

  const product = await getProductByHandle(params.handle, region.id);

  if (!product) {
    console.log("No product found");
    return notFound();
  }

  return product.title;
}
