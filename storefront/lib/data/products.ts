"use server";

import type {SortOptions} from "@/modules/store/components/refinement-list/sort-products";
import type {HttpTypes} from "@medusajs/types";

import {sdk} from "@/lib/config";
import {sortProducts} from "@/lib/util/sort-products";

import {getAuthHeaders, getCacheOptions} from "./cookies";
import {getRegion, retrieveRegion} from "./regions";

export const listProducts = async ({
  countryCode,
  pageParam = 1,
  queryParams,
  regionId,
}: {
  countryCode?: string;
  pageParam?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
  regionId?: string;
}): Promise<{
  nextPage: null | number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
  response: {count: number; products: HttpTypes.StoreProduct[]};
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required");
  }

  const limit = queryParams?.limit || 12;
  const _pageParam = Math.max(pageParam, 1);
  const offset = (_pageParam - 1) * limit;

  let region: HttpTypes.StoreRegion | null | undefined;

  if (countryCode) {
    region = await getRegion(countryCode);
  } else {
    region = await retrieveRegion(regionId!);
  }

  if (!region) {
    return {
      nextPage: null,
      response: {count: 0, products: []},
    };
  }

  const headers = {
    ...(await getAuthHeaders()),
  };

  const next = {
    ...(await getCacheOptions("products")),
  };

  return sdk.client
    .fetch<{count: number; products: HttpTypes.StoreProduct[]}>(
      `/store/products`,
      {
        cache: "force-cache",
        headers,
        method: "GET",
        next,
        query: {
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
          limit,
          offset,
          region_id: region?.id,
          ...queryParams,
        },
      },
    )
    .then(({count, products}) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null;

      return {
        nextPage: nextPage,
        queryParams,
        response: {
          count,
          products,
        },
      };
    });
};

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  countryCode,
  page = 0,
  queryParams,
  sortBy = "created_at",
}: {
  countryCode: string;
  page?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
  sortBy?: SortOptions;
}): Promise<{
  nextPage: null | number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
  response: {count: number; products: HttpTypes.StoreProduct[]};
}> => {
  const limit = queryParams?.limit || 12;

  const {
    response: {count, products},
  } = await listProducts({
    countryCode,
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
  });

  const sortedProducts = sortProducts(products, sortBy);

  const pageParam = (page - 1) * limit;

  const nextPage = count > pageParam + limit ? pageParam + limit : null;

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit);

  return {
    nextPage,
    queryParams,
    response: {
      count,
      products: paginatedProducts,
    },
  };
};
