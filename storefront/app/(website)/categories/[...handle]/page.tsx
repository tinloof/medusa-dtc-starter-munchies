import type {PageProps} from "@/types";

import {Link} from "@/components/shared/button";
import PaginatedProductGrid from "@/components/shared/paginated-product-grid";
import Heading from "@/components/shared/typography/heading";
import {getCategoryByHandle} from "@/data/medusa/categories";
import {notFound} from "next/navigation";

type CategoryPageProps = PageProps<"...handle", "page">;

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;

  const {category, hasNextPage, products} = await getCategoryByHandle(
    params.handle,
    page,
  );

  if (!category) {
    console.log("No category found");
    return notFound();
  }

  return (
    <section className="mx-auto flex max-w-max-screen flex-col gap-10 px-5 pb-10 pt-[6.5rem] lg:px-8">
      <div>
        <Heading font="serif" tag="h1">
          {category.name}
        </Heading>
      </div>
      <div className="flex flex-col gap-6">
        <div></div>
        <PaginatedProductGrid products={products} />
        {hasNextPage && (
          <Link
            className="w-full"
            href={"?page=" + (page + 1).toString()}
            variant="outline"
          >
            Load more
          </Link>
        )}
      </div>
    </section>
  );
}
