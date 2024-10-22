import type {SearchParams} from "@/types";

import Icon from "@/components/shared/icon";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {getProducts} from "@/data/medusa/products";
import {getRegion} from "@/data/medusa/regions";
import {loadDictionary} from "@/data/sanity";

import {Link} from "../../shared/button";
import ClearAllButton from "../product-refinement/filters/clear-button";
import ProductGrid from "./grid";

export default async function PaginatedProducts({
  countryCode,
  searchParams,
}: {
  countryCode: string;
  searchParams: SearchParams<"category" | "collection" | "page" | "sort">;
}) {
  const category = parseSearchParam(searchParams.category)?.split(",");
  const collection = parseSearchParam(searchParams.collection)?.split(",");
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;

  const productsDictionary = await loadDictionary();

  const region = await getRegion(countryCode);

  if (!region) {
    return null;
  }

  const {hasNextPage, products} = await getProducts(page, region.id, {
    category_id: category,
    collection_id: collection,
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

export function ProductsSkeleton() {
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
