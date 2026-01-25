interface Fetcher {
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
}

export interface SearchParams {
  q?: string;
  collection_id?: string;
  category_id?: string;
  region_id?: string;
  limit?: number;
  offset?: number;
}

export interface CalculatedPrice {
  calculated_amount: number;
  original_amount: number;
  currency_code: string;
}

export interface SearchVariant {
  id: string;
  title: string;
  sku: string | null;
  calculated_price: CalculatedPrice | null;
}

export interface SearchHit {
  id: string;
  title: string;
  handle: string;
  description: string;
  thumbnail: string;
  collection_id: string;
  collection: string;
  category_ids: string[];
  categories: string[];
  type: { id: string; value: string } | null;
  variants: SearchVariant[];
}

export interface FacetValue {
  id: string;
  label: string;
  count: number;
}

export interface SearchResult {
  count: number;
  limit: number;
  offset: number;
  hits: SearchHit[];
  facets: {
    collections: FacetValue[];
    categories: FacetValue[];
  };
}

export async function searchProducts(
  fetcher: Fetcher,
  params: SearchParams
): Promise<SearchResult> {
  const searchParams = new URLSearchParams();

  if (params.q) {
    searchParams.set("q", params.q);
  }
  if (params.collection_id) {
    searchParams.set("collection_id", params.collection_id);
  }
  if (params.category_id) {
    searchParams.set("category_id", params.category_id);
  }
  if (params.region_id) {
    searchParams.set("region_id", params.region_id);
  }
  if (params.limit) {
    searchParams.set("limit", String(params.limit));
  }
  if (params.offset) {
    searchParams.set("offset", String(params.offset));
  }

  const qs = searchParams.toString();
  const url = qs ? `http://search/?${qs}` : "http://search/";
  const response = await fetcher.fetch(url);

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  return response.json();
}
