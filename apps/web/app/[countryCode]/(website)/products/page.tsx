import { Suspense } from "react";

import PaginatedProducts, {
  ProductsSkeleton,
} from "@/components/products/paginated-product";
import Refinement from "@/components/products/product-refinement";
import Heading from "@/components/shared/typography/heading";

type CollectionPageProps = PageProps<"/[countryCode]/products">;

export default async function CollectionPage(props: CollectionPageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  return (
    <section className="mx-auto flex max-w-max-screen flex-col gap-10 px-m pt-26 pb-10 lg:px-xl">
      <div>
        <Heading desktopSize="7xl" font="serif" mobileSize="2xl" tag="h1">
          Shop all products
        </Heading>
      </div>
      <div className="flex flex-col gap-6">
        <Refinement searchParams={searchParams} />
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
