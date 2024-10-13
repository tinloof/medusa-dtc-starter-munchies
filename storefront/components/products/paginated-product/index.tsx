import {getProducts} from "@/data/medusa/products";
import {getRegion} from "@/data/medusa/regions";
import {loadDictionary} from "@/data/sanity";

import {Link} from "../../shared/button";
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

  return (
    <>
      <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-3">
        <ProductGrid
          products={products}
          productsDictionary={productsDictionary}
        />
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
