import type { PageProps } from "@/types";

import { getCategoryByHandle } from "@/data/medusa/categories";
import { notFound } from "next/navigation";

type CategoryPageProps = PageProps<"...handle">;

export default async function CategoryPage({params}: CategoryPageProps) {
  const category = await getCategoryByHandle(params.handle);

  if (!category) {
    console.log("No category found");
    return notFound();
  }

  return category.name
}
