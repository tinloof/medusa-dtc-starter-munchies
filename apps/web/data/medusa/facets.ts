import { sql } from "drizzle-orm";
import { medusaDb } from "./db";

type FacetedSearchFilters = {
  collections?: string[];
  categories?: string[];
};

type FacetedFilter = {
  facet_name: "collection_id" | "category_id";
  facet_value: string;
  count: number;
  title: string;
};

export async function getFacetedFilters(
  filters?: FacetedSearchFilters
): Promise<FacetedFilter[]> {
  const collectionConditions: ReturnType<typeof sql>[] = [];
  const categoryConditions: ReturnType<typeof sql>[] = [];

  if (filters?.collections?.length) {
    for (const id of filters.collections) {
      collectionConditions.push(sql`p.collection_id = ${id}`);
    }
  }

  if (filters?.categories?.length) {
    for (const id of filters.categories) {
      categoryConditions.push(sql`pcp.product_category_id = ${id}`);
    }
  }

  const collectionWhere =
    collectionConditions.length > 0
      ? sql`AND (${sql.join(collectionConditions, sql` OR `)})`
      : sql``;

  const categoryWhere =
    categoryConditions.length > 0
      ? sql`AND (${sql.join(categoryConditions, sql` OR `)})`
      : sql``;

  const facetedQuery = sql`
  WITH all_facets AS (
      SELECT 'collection_id' AS facet_name, id::text AS facet_value, title
      FROM product_collection
    UNION ALL
      SELECT 'category_id', id::text, name
      FROM product_category
  ),
  facet_counts AS (
    SELECT facet_name, facet_value, COUNT(DISTINCT p.id) AS cnt
    FROM product p
    JOIN product_category_product pcp
      ON pcp.product_id = p.id
    CROSS JOIN LATERAL (
      VALUES
        ('collection_id', p.collection_id::text),
        ('category_id', pcp.product_category_id::text)
    ) facets(facet_name, facet_value)
    WHERE (
        facets.facet_name = 'collection_id'
        ${categoryWhere}
      )
      OR (
        facets.facet_name = 'category_id'
        ${collectionWhere}
      )
    GROUP BY 1, 2
  )
  SELECT af.facet_name, af.facet_value, COALESCE(fc.cnt, 0)::int AS count, af.title
  FROM all_facets af
  LEFT JOIN facet_counts fc
    ON fc.facet_name = af.facet_name
    AND fc.facet_value = af.facet_value
  ORDER BY af.facet_name, af.facet_value;
  `;

  const facetedResult = await medusaDb.execute(facetedQuery);
  return facetedResult.rows as FacetedFilter[];
}
