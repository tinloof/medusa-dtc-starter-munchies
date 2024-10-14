import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {getProducts} from "@/data/medusa/products";
import {getRegion} from "@/data/medusa/regions";
import {loadDictionary} from "@/data/sanity";

import {Link} from "../../shared/button";
import ClearAllButton from "../product-refinement/filters/clear-button";
import ProductGrid from "./grid";

export default async function PaginatedProducts({
  category,
  collection,
  page,
  sortBy: order,
}: {
  category?: string | string[];
  collection?: string | string[];
  page: number;
  sortBy?: string;
}) {
  const productsDictionary = await loadDictionary();

  const region = await getRegion(
    // TODO: Make this come from the params
    process.env.NEXT_PUBLIC_MEDUSA_DEFAULT_COUNTRY_CODE!,
  );

  if (!region) {
    return null;
  }

  const {hasNextPage, products} = await getProducts(page, region.id, {
    category_id: category,
    collection_id: collection,
    order,
  });
  const hasFilters = category || collection;
  return (
    <>
      {products.length === 0 && (
        <div className="flex w-full flex-1 flex-col items-start gap-xs py-2xl">
          <Heading font="sans" mobileSize="xs" tag="h2">
            {productsDictionary?.noResultsText}
          </Heading>
          <Body font="sans" mobileSize="lg">
            {productsDictionary?.noResultsDescription}
          </Body>
          {hasFilters && <ClearAllButton variant="button" />}
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-3">
        <ProductGrid products={products} />
      </div>
      {hasNextPage && (
        <Link
          className="w-full"
          href={"?page=" + (page + 1).toString()}
          variant="outline"
        >
          Load more
        </Link>
      )}
    </>
  );
}
