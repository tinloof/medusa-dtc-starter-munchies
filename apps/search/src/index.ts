import { create, insertMultiple, type Orama, search } from "@orama/orama";
import metadata from "../data/metadata.json";
import productsData from "../data/products.json";

const schema = {
  id: "string",
  title: "string",
  handle: "string",
  description: "string",
  thumbnail: "string",
  collection_id: "string",
  collection: "string",
  category_ids: "string[]",
  categories: "string[]",
} as const;

type ProductSchema = typeof schema;
interface OramaFacet {
  count: number;
  values: Record<string, number>;
}
interface FacetValue {
  id: string;
  label: string;
  count: number;
}

interface VariantPrice {
  calculated_amount: number;
  original_amount: number;
  currency_code: string;
}

interface StoredVariant {
  id: string;
  title: string;
  sku: string | null;
  prices: Record<string, VariantPrice>;
}

interface StoredProduct {
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
  variants: StoredVariant[];
}

let db: Orama<ProductSchema> | null = null;

function getDb() {
  if (db) {
    return db;
  }

  db = create({ schema });
  insertMultiple(db, productsData);
  return db;
}

// Fill in missing facet values with 0 and include labels
function buildFacets(
  facet: OramaFacet | undefined,
  allValues: Record<string, string>
): FacetValue[] {
  return Object.entries(allValues).map(([id, label]) => ({
    id,
    label,
    count: facet?.values[id] ?? 0,
  }));
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") ?? "";
    const limit = Math.min(Number(url.searchParams.get("limit")) || 20, 100);
    const offset = Number(url.searchParams.get("offset")) || 0;
    const regionId = url.searchParams.get("region_id");
    const collectionIds = url.searchParams
      .get("collection_id")
      ?.split(",")
      .filter(Boolean);
    const categoryIds = url.searchParams
      .get("category_id")
      ?.split(",")
      .filter(Boolean);

    const orama = getDb();

    // Build filter: OR within each filter type, AND between filter types
    const where: Record<string, unknown> = {};
    if (collectionIds?.length) {
      where.collection_id = collectionIds;
    }
    if (categoryIds?.length) {
      where.category_ids = categoryIds;
    }

    const results = await search(orama, {
      term: query,
      limit,
      offset,
      ...(Object.keys(where).length > 0 && { where }),
      facets: {
        collection_id: {},
        category_ids: {},
      },
    });

    // For OR-based filtering, facets should show counts as if their own
    // filter was not applied (but other filters still apply)
    let categoryFacets = results.facets?.category_ids as OramaFacet | undefined;
    let collectionFacets = results.facets?.collection_id as
      | OramaFacet
      | undefined;

    // Category facets: exclude category filter
    if (categoryIds?.length) {
      const whereWithoutCategory: Record<string, unknown> = {};
      if (collectionIds?.length) {
        whereWithoutCategory.collection_id = collectionIds;
      }
      const categoryFacetResults = search(orama, {
        term: query,
        limit: 0,
        ...(Object.keys(whereWithoutCategory).length > 0 && {
          where: whereWithoutCategory,
        }),
        facets: { category_ids: {} },
      });
      categoryFacets = categoryFacetResults.facets?.category_ids as
        | OramaFacet
        | undefined;
    }

    // Collection facets: exclude collection filter
    if (collectionIds?.length) {
      const whereWithoutCollection: Record<string, unknown> = {};
      if (categoryIds?.length) {
        whereWithoutCollection.category_ids = categoryIds;
      }
      const collectionFacetResults = search(orama, {
        term: query,
        limit: 0,
        ...(Object.keys(whereWithoutCollection).length > 0 && {
          where: whereWithoutCollection,
        }),
        facets: { collection_id: {} },
      });
      collectionFacets = collectionFacetResults.facets?.collection_id as
        | OramaFacet
        | undefined;
    }

    // Transform variants to include calculated_price for requested region
    const hits = results.hits.map((hit: { document: StoredProduct }) => {
      const product = hit.document;
      return {
        ...product,
        variants: product.variants.map((variant) => ({
          id: variant.id,
          title: variant.title,
          sku: variant.sku,
          calculated_price: regionId
            ? (variant.prices[regionId] ?? null)
            : null,
        })),
      };
    });

    return Response.json({
      count: results.count,
      limit,
      offset,
      hits,
      facets: {
        collections: buildFacets(collectionFacets, metadata.collections),
        categories: buildFacets(categoryFacets, metadata.categories),
      },
    });
  },
};
