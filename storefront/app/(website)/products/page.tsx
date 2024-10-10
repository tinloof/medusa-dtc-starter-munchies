import type {PageProps} from "@/types";

import PaginatedProducts from "@/components/products/paginated-product";
import Refinement from "@/components/products/product-refinement";
import Heading from "@/components/shared/typography/heading";
import {Suspense} from "react";

type CollectionPageProps = PageProps<
  never,
  "category" | "collection" | "page" | "sort"
>;

export default async function CollectionPage({
  searchParams,
}: CollectionPageProps) {
  const query = {
    category: parseSearchParam(searchParams.category)?.split(","),
    collection: parseSearchParam(searchParams.collection)?.split(","),
    page:
      typeof searchParams.page === "string"
        ? parseInt(searchParams.page, 10)
        : 1,
    sort: parseSearchParam(searchParams.sort),
  };

  return (
    <section className="mx-auto flex max-w-max-screen flex-col gap-10 px-5 pb-10 pt-[6.5rem] lg:px-8">
      <div>
        <Heading font="serif" tag="h1">
          Shop all products
        </Heading>
      </div>
      <div className="flex flex-col gap-6">
        <Suspense fallback="Loading...">
          <Refinement />
        </Suspense>
        <Suspense fallback="Loading...">
          <PaginatedProducts {...query} />
        </Suspense>
      </div>
    </section>
  );
}
function parseSearchParam(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === "string") {
    return value;
  } else if (Array.isArray(value)) {
    return value[0];
  } else {
    return undefined;
  }
}
