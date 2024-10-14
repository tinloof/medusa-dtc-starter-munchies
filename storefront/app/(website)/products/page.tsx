import type {PageProps} from "@/types";

import PaginatedProducts from "@/components/products/paginated-product";
import Refinement from "@/components/products/product-refinement";
import Icon from "@/components/shared/icon";
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
    <section className="mx-auto flex max-w-max-screen flex-col gap-10 px-m pb-10 pt-[6.5rem] lg:px-xl">
      <div>
        <Heading desktopSize="7xl" font="serif" mobileSize="2xl" tag="h1">
          Shop all products
        </Heading>
      </div>
      <div className="flex flex-col gap-6">
        <Suspense>
          <Refinement />
        </Suspense>
        <Suspense fallback={<ProductsSkeleton />}>
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

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-3">
      {[...Array(9)].map((_, index) => (
        <div key={index}>
          <div className="relative aspect-square w-full rounded-lg border border-accent">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Icon
                className="size-10 animate-spin-loading"
                name="LoadingAccent"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-lg py-s">
            <div className="h-[30px] w-3/4 rounded-s bg-accent opacity-10" />
            <div className="h-6 w-1/2 rounded-s bg-accent opacity-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
