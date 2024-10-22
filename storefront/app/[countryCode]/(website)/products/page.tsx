import type {PageProps} from "@/types";

import PaginatedProducts, {
  ProductsSkeleton,
} from "@/components/products/paginated-product";
import Refinement from "@/components/products/product-refinement";
import Heading from "@/components/shared/typography/heading";
import {Suspense} from "react";

type CollectionPageProps = PageProps<
  "countryCode",
  "category" | "collection" | "page" | "sort"
>;

export default async function CollectionPage(props: CollectionPageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  return (
    <section className="mx-auto flex max-w-max-screen flex-col gap-10 px-m pb-10 pt-[6.5rem] lg:px-xl">
      <div>
        <Heading desktopSize="7xl" font="serif" mobileSize="2xl" tag="h1">
          Shop all products
        </Heading>
      </div>
      <div className="flex flex-col gap-6">
        <Refinement />
        <Suspense fallback={<ProductsSkeleton />}>
          <PaginatedProducts
            countryCode={params.countryCode}
            searchParams={searchParams}
          />
        </Suspense>
      </div>
    </section>
  );
}
